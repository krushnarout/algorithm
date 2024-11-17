const { deleteProject } = require('../../controllers/projectController');

const deleteCommand = async (user, projectName) => {
  try {
    const project = await deleteProject(user, projectName);
    console.log(`Deleted project: ${project.name}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = deleteCommand;
