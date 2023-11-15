const express = require('express');
const controller = require('../controllers/userController.js');
const { isLoggedIn, isGuest } = require('../middleware/auth.js');

const router = express.Router();

router.get('/new', controller.new);

router.post('/', isGuest, controller.create);

router.get('/login', isGuest, controller.getLogin);

router.post('/login', isGuest, controller.login);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
