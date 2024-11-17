const Project = require('../models/Project');

const MAX_PROJECTS = 10;

const startProject = async (user, projectName) => {
  const projectCount = await Project.countDocuments({ user });
  if (projectCount >= MAX_PROJECTS) throw new Error('You are running 10 projects, delete one to add a new one.');

  const existingProject = await Project.findOne({ user, name: projectName });
  if (existingProject) throw new Error('Project already exists.');

  const project = new Project({ name: projectName, user, startTime: new Date() });
  await project.save();
  return project;
};

const stopProject = async (user, projectName) => {
  const project = await Project.findOne({ user, name: projectName });
  if (!project || project.endTime) throw new Error('Project not found or already stopped.');

  const endTime = new Date();
  const duration = (endTime - project.startTime) / 1000;
  project.endTime = endTime;
  project.totalTime += duration;
  await project.save();
  return project;
};

const listProjects = async (user) => {
  return await Project.find({ user }).select('name');
};

const deleteProject = async (user, projectName) => {
  const project = await Project.findOneAndDelete({ user, name: projectName });
  if (!project) throw new Error('Project not found.');
  return project;
};

module.exports = { startProject, stopProject, listProjects, deleteProject };
