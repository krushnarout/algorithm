const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  startTime: Date,
  endTime: Date,
  totalTime: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
