const model = require('../models/event.js');

exports.isGuest = (req, res, next) => {
	if (!req.session.user) return next();
	req.flash('error', 'You are already logged in');
	res.redirect('/users/profile');
};

exports.isLoggedIn = (req, res, next) => {
	if (req.session.user) return next();
	req.flash('error', 'You must be logged in');
	res.redirect('/users/login');
};

exports.isAuthor = async (req, res, next) => {
	const id = req.params.id;
	const event = await model.findById(id).catch(err => next(err));
	if (!event) {
		const error = new Error(`Cannot find event with id ${id}`);
		error.status = 404;
		return next(error);
	}
	if (event.host !== req.session.user) {
		const error = new Error('You are not authorized');
		error.status = 401;
		return next(error);
	}
	next();
};
