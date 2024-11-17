const express = require('express');
const authController = require('./controllers/authController');

const app = express();

app.get('/auth/github', authController.githubAuth);
app.get('/auth/github/callback', authController.githubCallback);
app.get('/check-session', authController.checkSession);

module.exports = app;
