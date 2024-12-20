// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Brak tokenu autoryzacji' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ error: 'Użytkownik nie istnieje' });
        if (user.is_blocked) return res.status(403).json({ error: 'Konto zablokowane' });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Nieprawidłowy token' });
    }
};

const adminOnly = (req, res, next) => {
    if (!req.user.is_admin) return res.status(403).json({ error: 'Brak uprawnień administratora' });
    next();
};

module.exports = { auth, adminOnly };
