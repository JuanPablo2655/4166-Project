const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 5,
	handler: (req, res, next) => {
		const err = new Error('Too many login attempts, please try again later');
		err.status = 429;
		next(err);
	},
});
