const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
});

module.exports = mongoose.model('Actor', ActorSchema);