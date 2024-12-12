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

// Dodanie nowego reżysera
router.post(path + '/', auth, async (req, res) => {
    try {
        const { first_name, last_name } = req.body;

        // Walidacja danych wejściowych
        if (!first_name || !last_name) {
            return res.status(400).json({ error: 'Imię i nazwisko są wymagane.' });
        }

        // Utworzenie nowego reżysera
        const newDirector = new Director({ first_name, last_name });

        // Zapis do bazy danych
        await newDirector.save();

        res.status(201).json(newDirector);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera podczas dodawania reżysera.' });
    }
});

module.exports = router;
