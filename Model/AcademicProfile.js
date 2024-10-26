const mongoose = require('mongoose');

const academicProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  currentGPA: String,
  department: String,
  expectedGraduationYear: Number,
  skillsAcquired: [String],
});

module.exports = mongoose.model('AcademicProfile', academicProfileSchema);
