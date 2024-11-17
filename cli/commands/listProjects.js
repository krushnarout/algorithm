const { listProjects } = require('../../controllers/projectController');

const listProjectsCommand = async (user) => {
  try {
    const projects = await listProjects(user);
    if (projects.length === 0) {
      console.log("No projects found.");
    } else {
      console.log("Active projects:");
      projects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.name}`);
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = listProjectsCommand;
