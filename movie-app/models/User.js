const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false },
    favorites: [
        {
            movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
            added_date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);