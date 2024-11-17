const express = require('express');
const router = express.Router();
const { githubAuth, githubCallback, checkSession } = require('../controllers/authController');

router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);
router.get('/check-session', checkSession);

module.exports = router;
