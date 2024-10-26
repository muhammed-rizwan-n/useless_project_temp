const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  photos: [String],
  name: String,
});

module.exports = mongoose.model('Photos', photoSchema);
