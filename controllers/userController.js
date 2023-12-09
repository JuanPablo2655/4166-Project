const model = require('../models/user.js');
const Event = require('../models/event.js');
const RSVP = require('../models/rsvp.js');

exports.new = (req, res) => {
	res.render('users/new');
};

exports.create = async (req, res, next) => {
	try {
		const user = new model(req.body);
		if (Object.keys(user).length === 0) {
			const err = new Error("Can't create empty user");
			err.status = 400;
			throw err;
		}
		console.log(user);

		if (req.body.password !== req.body.confirmPassword) {
			req.flash('error', 'Passwords do not match');
			return res.redirect('/users/signup');
		}

		await user.save().catch(err => {
			if (err.name === 'ValidationError') {
				req.flash('error', err.message);
				return res.redirect('/users/signup');
			}
			if (err.code === 11000) {
				req.flash('error', 'Email is already taken');
				return res.redirect('/users/signup');
			}
			throw err;
		});
		res.redirect('/users/login');
	} catch (error) {
		next(error);
	}
};

exports.getLogin = (req, res) => {
	res.render('users/login');
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await model.findOne({ email }).catch(err => next(err));
		if (!user) {
			req.flash('error', 'Invalid email');
			return res.redirect('/users/login');
		}
		console.log(password);
		const result = await user.comparePassword(password);
		if (!result) {
			req.flash('error', 'Invalid password');
			return res.redirect('/users/login');
		}
		req.session.user = user._id;
		req.flash('success', `Welcome back ${user.firstName} ${user.lastName}`);
		res.redirect('/users/profile');
	} catch (error) {
		next(error);
	}
};

exports.profile = async (req, res, next) => {
	const id = req.session.user;
	const [user, events, rsvps] = await Promise.all([
		model.findById(id),
		Event.find({ host: id }),
		RSVP.find({ user: id }).populate('event', 'title'),
	]).catch(err => next(err));
	console.log(user, events, rsvps);

	res.render('users/profile', { user, events, rsvps });
};

exports.logout = (req, res, next) => {
	req.session.destroy(err => {
		if (err) return next(err);
		else res.redirect('/');
	});
};
