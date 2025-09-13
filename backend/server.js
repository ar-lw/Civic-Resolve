// server.js

// ## 1. IMPORTS
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';
import authMiddleware from './authMiddleware.js';
import adminAuthMiddleware from './adminAuthMiddleware.js';

// ## 2. INITIALIZATION
const app = express();

// ## 3. MIDDLEWARE
app.use(cors());
app.use(express.json());

// --- 4. API ROUTES ---

// ## USER AUTHENTICATION ROUTES ##
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Please provide all fields.' });
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) return res.status(400).json({ message: 'User with this email already exists.' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [name, email, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, name: user.name }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// ## USER COMPLAINT ROUTES ##

// Create Complaint Endpoint (Protected)
app.post('/api/complaints', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description, category, location } = req.body;
        const sql = 'INSERT INTO complaints (user_id, title, description, category, location) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(sql, [userId, title, description, category, location]);
        res.status(201).json({
            message: 'Complaint submitted successfully!',
            complaintId: result.insertId
        });
    } catch (error) {
        console.error('Complaint submission error:', error);
        res.status(500).json({ message: 'Server error during complaint submission.' });
    }
});

// Get All Complaints for a Logged-In User (Protected)
app.get('/api/complaints', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const sql = `
            SELECT 
                complaints.*, 
                users.name as userName 
            FROM complaints 
            JOIN users ON complaints.user_id = users.id 
            WHERE complaints.user_id = ? 
            ORDER BY submitted_date DESC
        `;
        const [complaints] = await db.query(sql, [userId]);
        res.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Server error while fetching complaints.' });
    }
});

// Get a Single Complaint by ID (for the user who owns it)
app.get('/api/complaints/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const sql = 'SELECT * FROM complaints WHERE id = ? AND user_id = ?';
        const [complaints] = await db.query(sql, [id, userId]);

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'Complaint not found or you do not have permission to view it.' });
        }
        res.json(complaints[0]);
    } catch (error) {
        console.error('Error fetching single complaint:', error);
        res.status(500).json({ message: 'Server error while fetching complaint.' });
    }
});

// ## ADMIN ROUTES ##
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [admins] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
        const admin = admins[0];
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: admin.id, name: admin.name, isAdmin: true }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error during admin login.' });
    }
});

app.get('/api/admin/complaints', adminAuthMiddleware, async (req, res) => {
    try {
        const sql = `
            SELECT complaints.*, users.name as userName 
            FROM complaints JOIN users ON complaints.user_id = users.id 
            ORDER BY submitted_date DESC`;
        const [complaints] = await db.query(sql);
        res.json(complaints);
    } catch (error) {
        console.error('Error fetching all complaints:', error);
        res.status(500).json({ message: 'Server error while fetching complaints.' });
    }
});

app.put('/api/admin/complaints/:id/status', adminAuthMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ['Pending', 'In Progress', 'Resolved', 'Rejected'];
        if (!validStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status value.' });
        const sql = 'UPDATE complaints SET status = ? WHERE id = ?';
        const [result] = await db.query(sql, [status, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Complaint not found.' });
        res.json({ message: 'Complaint status updated successfully!' });
    } catch (error) {
        console.error('Error updating complaint status:', error);
        res.status(500).json({ message: 'Server error while updating status.' });
    }
});
// Add this inside the ## ADMIN ROUTES ## section of server.js

// ## Add a Reply to a Complaint (Admin Only)
app.post('/api/admin/complaints/:id/reply', adminAuthMiddleware, async (req, res) => {
    try {
        const complaintId = req.params.id;
        const adminId = req.user.id;
        const adminName = req.user.name;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Reply message cannot be empty.' });
        }

        const sql = 'INSERT INTO replies (complaint_id, admin_id, author_name, message) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [complaintId, adminId, adminName, message]);

        res.status(201).json({ message: 'Reply added successfully!', replyId: result.insertId });

    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ message: 'Server error while adding reply.' });
    }
});
// Add this inside the ## ADMIN ROUTES ## section of server.js

// ## Get a Single Complaint by ID (Admin Only)
app.get('/api/admin/complaints/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `
            SELECT complaints.*, users.name as userName 
            FROM complaints 
            JOIN users ON complaints.user_id = users.id 
            WHERE complaints.id = ?
        `;
        const [complaints] = await db.query(sql, [id]);

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }
        res.json(complaints[0]);
    } catch (error) {
        console.error('Error fetching single complaint:', error);
        res.status(500).json({ message: 'Server error while fetching complaint.' });
    }
});

// --- 5. SERVER INITIALIZATION ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});