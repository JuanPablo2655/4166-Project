const rateLimit = require('express-rate-limit');

const minute = 60000;

exports.loginLimiter = rateLimit({
	windowMs: minute * 5,
	max: 5,
	handler: (req, res, next) => {
		const err = new Error('Too many login attempts, please try again later');
		err.status = 429;
		next(err);
	},
});

exports.signupLimiter = rateLimit({
	windowMs: minute * 5,
	max: 5,
	handler: (req, res, next) => {
		const err = new Error('Too many sign up attempts, please try again later');
		err.status = 429;
		next(err);
	},
});

exports.eventLimiter = rateLimit({
	windowMs: minute * 5,
	max: 10,
	handler: (req, res, next) => {
		const err = new Error('Too many event requests, please try again later');
		err.status = 429;
		next(err);
	},
});

exports.rsvpLimiter = rateLimit({
	windowMs: minute * 5,
	max: 5,
	handler: (req, res, next) => {
		const err = new Error('Too many RSVP requests, please try again later');
		err.status = 429;
		next(err);
	},
});
