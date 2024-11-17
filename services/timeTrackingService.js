const Project = require('../models/Project');

const calculateTimeSpent = (project) => {
  if (!project.startTime || !project.endTime) return 0;
  return (project.endTime - project.startTime) / 1000;
};

module.exports = { calculateTimeSpent };
