import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET; // Allow JWT_SECRET to be undefined initially
export const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (!JWT_SECRET) {
                console.error('JWT_SECRET is not defined in environment variables.');
                return res.status(500).json({ message: 'Server configuration error: JWT secret not found.' });
            }
            const decoded = jwt.verify(token ?? '', JWT_SECRET);
            // Runtime check to ensure decoded object has the expected properties
            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'mobile' in decoded) {
                req.user = decoded; // Now safely cast to UserPayload
                next();
            }
            else {
                res.status(401).json({ message: 'Not authorized, invalid token payload' });
            }
        }
        catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
//# sourceMappingURL=authMiddleware.js.map