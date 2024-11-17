const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  sessionActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', UserSchema);
