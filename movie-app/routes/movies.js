// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { auth, adminOnly } = require('../middleware/auth');
const path = '/movies';

// Pobierz wszystkie filmy
router.get(path + '/', auth, async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Pobierz szczegóły filmu
router.get(path + '/:id', auth, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Film nie znaleziony' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Pobierz filmy spełniające kryteria wyszukiwania
// np: api/movies/search?actors=Leonardo%20DiCaprio,Joseph%20Gordon-Levitt&release_year=2010
router.get(path + '/filter', auth, async (req, res) => {
    try {
        const { id, title, release_year, genre, countryOfOrigin, director, actors } = req.query;

        // Budowanie dynamicznego obiektu filtrów
        const filters = {};

        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Podane ID jest nieprawidłowe' });
            }
            filters._id = id;
        }

        if (title) {
            filters.title = { $regex: title, $options: 'i' }; // Wyszukiwanie nie jest case-sensitive
        }

        if (release_year) {
            const year = parseInt(release_year, 10);
            if (isNaN(year) || release_year.length !== 4 || year < 1895) {
                return res.status(400).json({ error: 'Podany rok jest nieprawidłowy' });
            }
            filters.release_year = year;
        }

        if (genre) {
            // Sprawdzanie, czy gatunek istnieje w kolekcji Genre
            const genreExists = await Genre.findOne({ genre: { $regex: `^${genre}$`, $options: 'i' } });
            if (!genreExists) {
                return res.status(400).json({ error: `Gatunek "${genre}" nie istnieje` });
            }

            filters.genre = { $regex: genre, $options: 'i' };
        }

        if (countryOfOrigin) {
            const countryExists = await Country.findOne({ country: { $regex: `^${countryOfOrigin}$`, $options: 'i' } });
            if (!countryExists) {
                return res.status(400).json({ error: `Kraj "${countryOfOrigin}" nie istnieje` });
            }
            filters.countryOfOrigin = { $regex: countryOfOrigin, $options: 'i' };
        }

        if (director) {
            const [firstName, lastName] = director.split(' ');
            const directorExists = await Director.findOne({
                first_name: { $regex: `^${firstName}$`, $options: 'i' },
                last_name: { $regex: `^${lastName}$`, $options: 'i' }
            });
            if (!directorExists) {
                return res.status(400).json({ error: `Reżyser "${director}" nie istnieje w bazie danych` });
            }
            filters.director = { $regex: director, $options: 'i' };
        }

        if (actors) {
            const actorNames = actors.split(','); // Lista aktorów oddzielona przecinkami
            const invalidActors = [];

            for (const actor of actorNames) {
                const [firstName, lastName] = actor.trim().split(' ');
                const actorExists = await Actor.findOne({
                    first_name: { $regex: `^${firstName}$`, $options: 'i' },
                    last_name: { $regex: `^${lastName}$`, $options: 'i' }
                });
                if (!actorExists) {
                    invalidActors.push(actor);
                }
            }

            if (invalidActors.length > 0) {
                return res.status(400).json({
                    error: `Nie znaleziono następujących aktorów: ${invalidActors.join(', ')}`
                });
            }

            filters.actors = { $in: actorNames }; // Szuka aktorów w polu actors w Movie
        }

        const movies = await Movie.find(filters);

        if (!movies || movies.length === 0) {
            return res.status(404).json({ error: 'Nie znaleziono filmów spełniających kryteria wyszukiwania' });
        }

        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Dodaj nowy film (tylko dla adminów)
router.post(path + '/', auth, adminOnly, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: 'Błąd przy dodawaniu filmu' });
    }
});

// Edytuj film (tylko dla adminów)
router.put(path + '/:id', auth, adminOnly, async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ error: 'Film nie znaleziony' });
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: 'Błąd przy aktualizacji filmu' });
    }
});

// Usuń film (tylko dla adminów)
router.delete(path + '/:id', auth, adminOnly, async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ error: 'Film nie znaleziony' });
        res.json({ message: 'Film usunięty' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd przy usuwaniu filmu' });
    }
});

module.exports = router;