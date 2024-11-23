const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    release_year: Number,
    genre: String,
    countryOfOrigin: String,
    director: String,
    actors: [String],
    added_date: { type: Date, default: Date.now },
    imgUrl: String,
    description: String,
});

module.exports = mongoose.model('Movie', MovieSchema);