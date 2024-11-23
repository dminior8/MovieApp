const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const tokenBlacklist = new Set(); // Lista zbanowanych tokenów

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email już istnieje' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password_hash: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Użytkownik zarejestrowany' });
    } catch (error) {
        console.error("Błąd rejestracji:", error);
        res.status(500).json({ error: 'Błąd rejestracji' });
    }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
        }

        const token = jwt.sign({ id: user._id, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Błąd logowania' });
    }
});

// Wylogowanie użytkownika
router.post('/logout', (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Brak tokenu uwierzytelniającego' });
        }

        const token = authHeader.split(' ')[1];
        tokenBlacklist.add(token);

        res.status(200).json({ message: 'Pomyślnie wylogowano' });
    } catch (error) {
        console.error('Błąd wylogowania:', error);
        res.status(500).json({ error: 'Błąd wylogowania' });
    }
});

// Middleware sprawdzający, czy token jest zbanowany
const isTokenBlacklisted = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (tokenBlacklist.has(token)) {
            return res.status(401).json({ error: 'Token jest nieważny. Zaloguj się ponownie.' });
        }
    }

    next();
};

// Eksport routera i middleware
module.exports = { authRouter: router, isTokenBlacklisted };
