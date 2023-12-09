const express = require('express');
const controller = require('../controllers/rsvpController.js');
const { isLoggedIn } = require('../middleware/auth.js');
const { validateRSVP, validateResults } = require('../middleware/validator.js');

const router = express.Router();

router.post('/', isLoggedIn, validateRSVP, validateResults, controller.createOrUpdate);

module.exports = router;
