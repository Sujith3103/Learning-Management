  const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  pricing: Number,
  objectives: String,
  welcomeMessage: String,
  image: String,

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },    

  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  }],

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
