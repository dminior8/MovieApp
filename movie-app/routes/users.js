const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Movie = require('../models/Movie');
const { auth, adminOnly } = require('../middleware/auth');
const path = '/users';

// Pobierz wszystkich uzytkowników
router.get(path + '/', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Pobierz szczegóły
router.get(path + '/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Pobierz wszystkie ulubione filmy
router.get(path + '/:user_id/favorites', async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id).populate('favorites');
        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Dodaj film do ulubionych
router.post(path + '/:user_id/favorites/:movie_id', async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id); // Używamy user_id z URL
        if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' });

        // Sprawdzenie, czy film już istnieje w ulubionych
        const movieExists = user.favorites.some(fav => fav.movie_id.toString() === req.params.movie_id); // movie_id w URL
        if (movieExists) return res.status(400).json({ error: 'Film już jest w ulubionych' });

        // Dodanie filmu do ulubionych
        user.favorites.push({ movie_id: req.params.movie_id }); // movie_id z URL
        await user.save();
        res.json({ message: 'Film dodany do ulubionych' });
    } catch (error) {
        console.error(error); // Logowanie błędów
        res.status(500).json({ error: 'Błąd przy dodawaniu do ulubionych' });
    }
});



// Usuń film z ulubionych
router.delete(path + '/:id/favorites/:movie_id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' });

        // Używamy movie_id zamiast movieId
        user.favorites = user.favorites.filter(fav => fav.movie_id.toString() !== req.params.movie_id); // <-- Używamy movie_id
        await user.save();
        res.json({ message: 'Film usunięty z ulubionych' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd przy usuwaniu z ulubionych' });
    }
});

// Usuń użytkownika (tylko dla adminów)
router.delete(path + '/:id', auth, adminOnly, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
        res.json({ message: 'Użytkownik został usunięty' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd przy usuwaniu użytkownika' });
    }
});

module.exports = router;
