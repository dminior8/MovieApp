// routes/actors.js
const express = require('express');
const router = express.Router();
const Actor = require('../models/Actor');
const { auth } = require('../middleware/auth');
const path = '/actors';

// Pobranie listy aktorów
router.get(path + '/', auth, async (req, res) => {
    try {
        const actors = await Actor.find({});
        res.json(actors);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

module.exports = router;
