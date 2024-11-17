const { startProject } = require('../../controllers/projectController');

const startCommand = async (user, projectName) => {
  const project = await startProject(user, projectName);
  console.log(`${user}\nStarted tracking time for project: ${project.name}`);
};

module.exports = startCommand;
