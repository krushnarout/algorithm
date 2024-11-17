const { stopProject } = require('../../controllers/projectController');

const stopCommand = async (user, projectName) => {
  const project = await stopProject(user, projectName);
  console.log(`${user}\nStopped tracking time for project: ${project.name}`);
};

module.exports = stopCommand;
