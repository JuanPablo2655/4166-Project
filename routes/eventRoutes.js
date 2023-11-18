const express = require('express');
const controller = require('../controllers/eventController.js');
const { fileUpload } = require('../middleware/fileUpload.js');
const { isLoggedIn, isAuthor } = require('../middleware/auth.js');
const { validateId } = require('../middleware/validator.js');

const router = express.Router();

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, fileUpload, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

router.put('/:id', isLoggedIn, validateId, isAuthor, fileUpload, controller.update);

router.delete('/:id', isLoggedIn, validateId, isAuthor, controller.delete);

module.exports = router;
