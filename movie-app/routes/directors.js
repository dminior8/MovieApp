// routes/directors.js
const express = require('express');
const router = express.Router();
const Director = require('../models/Director');
const { auth } = require('../middleware/auth');
const path = '/directors';

// Pobranie listy reżyserów
router.get(path + '/', auth, async (req, res) => {
    try {
        const directors = await Director.find({});
        res.json(directors);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

module.exports = router;
