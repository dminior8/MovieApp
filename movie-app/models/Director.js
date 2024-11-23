const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
});

module.exports = mongoose.model('Director', DirectorSchema);