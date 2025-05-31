const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    password: String,
    role :{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    
})

module.exports = mongoose.model('User', userSchema);
