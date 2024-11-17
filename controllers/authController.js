const axios = require('axios');
const UserSession = require('../models/UserSession');

const githubAuth = (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_REDIRECT_URI;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
};

const githubCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { accept: 'application/json' } }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: `token ${accessToken}` },
    });

    const username = userResponse.data.login;

    await UserSession.findOneAndUpdate(
      { username },
      { accessToken },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Session created for: ${username}`);
    res.send(`Welcome, ${username}! You can close this browser window.`);
  } catch (error) {
    console.error("Error in GitHub callback:", error);
    res.status(500).send('Authentication error');
  }
};

const checkSession = async (req, res) => {
  try {
    const session = await UserSession.findOne();

    if (session) {
      res.json({ username: session.username, accessToken: session.accessToken });
    } else {
      res.status(401).json({ message: 'User not logged in' });
    }
  } catch (error) {
    console.error("Error checking session:", error);
    res.status(500).send("Error checking session");
  }
};

module.exports = { githubAuth, githubCallback, checkSession };
