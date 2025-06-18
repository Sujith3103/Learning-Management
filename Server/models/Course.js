const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
    title : String,
    videoUrl : String,
    freePreview : Boolean,
    public_id : String
})

const CourseSchema = new mongoose({
    instructorId : String,
    instructorName: String,
    data: Date,
    title : String,
    category : String,
    level : String,
    primaryLanguage : String,
    subtitle : String,
    drscription : String,
    image : String,
    welcomeMessage : String,
    pricing : Number,
    objectives : String,
    students : [
        {
            studentId: String,
            studentName: String,
            studentEmail: String
        }
    ],
    curriculum : [LectureSchema],
    isPublished : Boolean

})

module.exports = mongoose.model('Course',CourseSchema)