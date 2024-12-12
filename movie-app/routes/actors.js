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

// Dodanie nowego aktora
router.post(path + '/', auth, async (req, res) => {
    try {
        const { first_name, last_name } = req.body;

        // Walidacja danych wejściowych
        if (!first_name || !last_name) {
            return res.status(400).json({ error: 'Imię i nazwisko są wymagane.' });
        }

        // Utworzenie nowego aktora
        const newActor = new Actor({ first_name, last_name });

        // Zapis do bazy danych
        await newActor.save();

        res.status(201).json(newActor);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera podczas dodawania aktora.' });
    }
});

module.exports = router;
