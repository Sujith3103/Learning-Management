const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    password: String,
    role :{
        type: String,
        enum: ['student', 'admin'],
        default: 'student',
    },
    
})

module.exports = mongoose.model('User', userSchema);
