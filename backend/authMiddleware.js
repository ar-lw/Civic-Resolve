import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Get the token from the "Authorization" header, which is usually in the format "Bearer <token>"
    const authHeader = req.headers.authorization;

    // Check if the header exists and is correctly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token using the same secret key you used to sign it
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Use the same secret as in server.js

        // Attach the user's information from the token to the request object
        req.user = decoded;
        
        // Call next() to pass control to the next function in the chain (your route handler)
        next();

    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token is invalid' });
    }
};

export default authMiddleware;