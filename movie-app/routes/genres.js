// routes/genres.js
const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');
const { auth } = require('../middleware/auth');
const path = '/genres';

// Pobranie listy gatunków filmowych
router.get(path + '/', auth, async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

module.exports = router;
