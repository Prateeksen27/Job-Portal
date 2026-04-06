import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired', code: 'TOKEN_EXPIRED' });
        }
        console.error("Token verification failed:", error);
        res.status(403).json({ message: 'Invalid token' });
    }
}

export const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Access denied, no token provided' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied, insufficient permissions' });
        }
        next();
    }
}