// routes/countries.js
const express = require('express');
const router = express.Router();
const Country = require('../models/Country');
const { auth } = require('../middleware/auth');
const path = '/countries';

// Pobranie listy krajów
router.get(path + '/', auth, async (req, res) => {
    try {
        const countries = await Country.find({});
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

module.exports = router;
