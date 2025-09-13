// adminAuthMiddleware.js
import jwt from 'jsonwebtoken';

const adminAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'your_jwt_secret');

        // This is the crucial part: check if the token includes the isAdmin flag
        if (decoded.isAdmin) {
            req.user = decoded; // Attach admin info to the request
            next(); // Proceed to the route handler
        } else {
            // If the token is valid but not for an admin, deny access
            res.status(403).json({ message: 'Forbidden, admin access required' });
        }
    } catch (error) {
        // If the token is invalid or expired
        res.status(401).json({ message: 'Not authorized, token is invalid' });
    }
};

export default adminAuthMiddleware;