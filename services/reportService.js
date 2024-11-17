const Project = require('../models/Project');
const dayjs = require('dayjs');

const generateReport = async (user, projectName, since) => {
  const project = await Project.findOne({ user, name: projectName });
  if (!project) throw new Error('Project not found.');

  const startDate = since ? dayjs(since).toDate() : project.startTime;
  const timeSpent = project.totalTime;

  return {
    project: project.name,
    totalTime: timeSpent / 3600,
  };
};

module.exports = { generateReport };
