# Civic Resolve System (CityFix) 🏛️

A full-stack civic issue reporting and management portal built for citizens and municipal administrators. This platform enables users to submit civic complaints (e.g., potholes, garbage disposal, street lighting) and allows administrators to track, manage, update, and reply to issues in real-time.

---

## 📌 Features

### 👤 Citizen Portal
* **User Authentication:** Secure registration and login using JWT and Bcrypt password hashing.
* **Submit Complaints:** Report civic issues with title, category, location, and detailed description.
* **Track Status:** Monitor complaint progress (Pending, In Progress, Resolved, Rejected) and stay updated on the actions taken by municipal administrators.
* **View Replies:** See official updates and responses from municipal admins.

### 🛡️ Admin Dashboard
* **Admin Authentication:** Separate, secure login for system administrators.
* **Overview & Management:** View all submitted complaints across the city sorted by date.
* **Status Updates:** Update complaint resolution status in real-time.
* **Direct Communication:** Post administrative replies and status updates to individual complaints.
* **User Lookup:** Query user credentials and records across the database.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, CSS3
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Authentication:** JSON Web Tokens (JWT) & BcryptJS

---

## 📂 Project Structure

```text
civic-resolve-system/
├── backend/
│   ├── adminAuthMiddleware.js
│   ├── authMiddleware.js
│   ├── db.js
│   ├── seedAdmin.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18+)
* [MySQL Server](https://www.mysql.com/)

---

### 2. Database Setup

1. Open your MySQL client and create the database:
   ```sql
   CREATE DATABASE civic_resolve;
   USE civic_resolve;
   ```

2. Create the necessary tables:
   ```sql
   -- Users Table
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Admins Table
   CREATE TABLE admins (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Complaints Table
   CREATE TABLE complaints (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       category VARCHAR(100) NOT NULL,
       location VARCHAR(255) NOT NULL,
       image_url VARCHAR(255),
       status ENUM('Pending', 'In Progress', 'Resolved', 'Rejected') DEFAULT 'Pending',
       submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );

   -- Replies Table
   CREATE TABLE replies (
       id INT AUTO_INCREMENT PRIMARY KEY,
       complaint_id INT NOT NULL,
       admin_id INT NOT NULL,
       author_name VARCHAR(255) NOT NULL,
       message TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
       FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
   );
   ```

---

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` root:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=civic_resolve
   JWT_SECRET=your_jwt_secret
   ```

4. Seed the initial Administrator account:
   ```bash
   node seedAdmin.js
   ```
   *Default Admin Credentials:*
   * **Email:** `admin@gmail.com`
   * **Password:** `admin123`

5. Start the backend server:
   ```bash
   npm start
   # or for development
   node server.js
   ```
   The backend runs at `http://localhost:5000`.

---

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend runs at `http://localhost:5173`.

---

## 📡 API Endpoints Summary

### Authentication Routes
* `POST /api/users/register` - Register a new citizen account
* `POST /api/users/login` - User login
* `POST /api/admin/login` - Admin login

### User Complaint Routes (Protected)
* `POST /api/complaints` - Submit a new complaint
* `GET /api/complaints` - Get all complaints submitted by the logged-in user
* `GET /api/complaints/:id` - Get complaint details & replies by ID

### Admin Routes (Protected - Admin Only)
* `GET /api/admin/complaints` - Retrieve all civic complaints
* `GET /api/admin/complaints/:id` - Retrieve single complaint with replies
* `PUT /api/admin/complaints/:id/status` - Update complaint status
* `POST /api/admin/complaints/:id/reply` - Add official reply to a complaint
* `GET /api/admin/users/search` - Search user database by name/email

---

## 📝 License
This project is open-source and developed for the Smart India Hackathon (SIH).
