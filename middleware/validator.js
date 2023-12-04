const { body } = require('express-validator');
const { categories } = require('../models/event.js');

exports.validateId = (req, res, next) => {
	const id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		const error = new Error(`Invalid event ${id}`);
		error.status = 400;
		return next(error);
	}
	next();
};

exports.validateEvent = [
	body('category', 'Invalid category').isIn(categories).trim().escape(),
	body('title', 'Title is required').isLength({ min: 3 }).trim().escape(),
	body('location', 'Location is required').isLength({ min: 3 }).trim().escape(),
	body('start', 'Start date is required').isISO8601().trim().escape(),
	body('end', 'End date is required').isISO8601().trim().escape(),
	body('details', 'Description is required').isLength({ min: 10 }).trim().escape(),
];

exports.validateSignUp = [
	body('username', 'Username is required').isLength({ min: 4 }).trim().escape(),
	body('firstName', 'First name cannot be empty').isLength({ min: 2 }).trim().escape(),
	body('lastName', 'Last name cannot be empty').isLength({ min: 2 }).trim().escape(),
	body('email', 'Email must be valid').isEmail().trim().escape().normalizeEmail(),
	body('password', 'Password must be at least 8 and at more 64 characters long')
		.isLength({ min: 8, max: 64 })
		.trim()
		.escape(),
];

exports.validateLogin = [
	body('email', 'Email must be valid').isEmail().trim().escape().normalizeEmail(),
	body('password', 'Password must be at least 8 and at more 64 characters long')
		.isLength({ min: 8, max: 64 })
		.trim()
		.escape(),
];

exports.validateResults = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		errors.array().forEach(error => req.flash('error', error.msg));
		return res.redirect('back');
	}
	next();
};
