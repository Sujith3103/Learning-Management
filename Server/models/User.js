const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: {
        type : String,
        unique : true
    },
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);
