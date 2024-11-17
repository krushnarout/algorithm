const Project = require('../../models/Project');

const reportCommand = async (username, projectName) => {
  try {
    const project = await Project.findOne({ name: projectName, user: username });

    if (!project) {
      console.log(`No project found with the name: ${projectName}`);
      return;
    }

    const totalTime = project.totalTime;
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);

    console.log(`You have spent ${hours} hours and ${minutes} minutes on project: ${projectName}`);
  } catch (error) {
    console.error("Error fetching project report:", error);
  }
};

module.exports = reportCommand;
