const express = require('express');
const controller = require('../controllers/rsvpController.js');

const router = express.Router();

router.post('/', controller.create);
