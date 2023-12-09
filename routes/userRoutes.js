const express = require('express');
const controller = require('../controllers/userController.js');
const { isLoggedIn, isGuest } = require('../middleware/auth.js');
const { loginLimiter, signupLimiter } = require('../middleware/rateLimiters.js');

const router = express.Router();

router.get('/signup', controller.new);

router.post('/', signupLimiter, isGuest, controller.create);

router.get('/login', isGuest, controller.getLogin);

router.post('/login', loginLimiter, isGuest, controller.login);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
