import { users } from '../db.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // Fallback for development
export const login = (req, res) => {
    const { mobile, otp } = req.body;
    if (otp === '123456') {
        let user = users.find((u) => u.mobile === mobile);
        if (!user) {
            user = { id: Date.now().toString(), mobile };
            users.push(user);
        }
        const token = jwt.sign({ id: user.id, mobile: user.mobile }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', user, token });
    }
    else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};
//# sourceMappingURL=authController.js.map