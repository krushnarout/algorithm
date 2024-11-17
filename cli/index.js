#!/usr/bin/env node

const axios = require('axios');
const startCommand = require('./commands/start');
const stopCommand = require('./commands/stop');
const deleteCommand = require('./commands/delete');
const listProjectsCommand = require('./commands/listProjects');
const reportCommand = require('./commands/report');
const connectDB = require('../config/database');

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

const getUserSession = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/check-session`);
    return response.data.username;
  } catch (error) {
    console.error("Session check failed:", error.message);
    return null;
  }
};

const waitForLogin = async () => {
  let username;
  let attempts = 0;
  while (!username && attempts < 2) {
    console.log('You need to log in with GitHub. Opening browser...');
    const open = (await import('open')).default;
    await open(`${baseURL}/auth/github`);

    console.log('Please complete the login in your browser, then return to the terminal.');

    await new Promise(resolve => setTimeout(resolve, 5000));
    username = await getUserSession();
    attempts += 1;
  }

  if (username) {
    console.log(`Welcome back, ${username}!`);
  } else {
    console.error("Login failed, exiting...");
    process.exit(1);
  }

  return username;
};

(async () => {
  const args = process.argv.slice(2);
  const [command, projectName] = args;
  let username = await getUserSession();

  if (!username) {
    username = await waitForLogin();
  }

  console.log(`Welcome back, ${username}!`);

  await connectDB();

  try {
    if (command === "start") {
      await startCommand(username, projectName);
    } else if (command === "stop") {
      await stopCommand(username, projectName);
    } else if (command === "delete") {
      await deleteCommand(username, projectName);
    } else if (command === "listProjects") {
      await listProjectsCommand(username);
    } else if (command === "report") {
      await reportCommand(username, projectName);
    } else {
      console.log("Unknown command.");
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    process.exit(0);
  }
})().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
