const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  department: String,
  year: Number,
  bio: String,
  email: String,
  password: String,
  phoneNo: String,
  socialMedia: {
    instagram: String,
  },
  AcademicProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicProfile',
  },
  thumbnail_url: String,
  username: String,
  id: String,
});

module.exports = mongoose.model('Users', userSchema);
