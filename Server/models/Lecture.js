const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  freePreview: Boolean,
  public_id: String
}, { timestamps: true });

module.exports = mongoose.model('Lecture', lectureSchema);
