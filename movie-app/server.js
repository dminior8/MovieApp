require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import routerów i middleware
const { authRouter, isTokenBlacklisted } = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const actorsRoutes = require('./routes/actors');
const countriesRoutes = require('./routes/countries');
const directorsRoutes = require('./routes/directors');
const genresRoutes = require('./routes/genres');
const usersRoutes = require('./routes/users');


const corsOptions = {
    origin: 'http://localhost:3000', // Adres frontendowego serwera
    methods: 'GET,POST,PUT,DELETE', // Dozwolone metody HTTP
    credentials: true, // Pozwala na przesyłanie ciasteczek i nagłówków autoryzacji
};

app.use(cors(corsOptions));
app.use(express.json());

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Połączono z MongoDB Atlas'))
    .catch(err => console.error('Błąd połączenia z MongoDB:', err));

// Middleware globalny: sprawdzanie czarnej listy tokenów
app.use(isTokenBlacklisted);

// Trasy
app.use('/api', movieRoutes); // /api/movies
app.use('/api', actorsRoutes); // /api/actors
app.use('/api', countriesRoutes); // /api/countries
app.use('/api', directorsRoutes); // /api/directors
app.use('/api', usersRoutes); // /api/users
app.use('/api', genresRoutes); // /api/genres
app.use('/api/auth', authRouter); // /api/auth

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
