const { findById } = require('../models/event.js');
const model = require('../models/rsvp.js');
const Event = require('../models/event.js');

exports.createOrUpdate = async (req, res, next) => {
	try {
		const filter = { event: req.body.event, user: req.session.user };
		const update = { status: req.body.status.toLowerCase() };
		const event = await Event.findById(req.body.event);
		if (!event) {
			const err = new Error(`Cannot find event with id ${req.params.id}`);
			err.status = 404;
			throw err;
		}
		console.log(event);
		if (event.host == req.session.user) {
			req.flash('error', 'You cannot RSVP to your own event');
			return res.redirect(`/events/${req.body.event}`);
		}
		await model.findOneAndUpdate(filter, update, { upsert: true }).catch(err => next(err));
		req.flash('success', 'Your RSVP has been saved');
		res.redirect(`/events/${req.body.event}`);
	} catch (err) {
		next(err);
	}
};

exports.delete = async (req, res, next) => {
	try {
		const filter = { event: req.body.event, user: req.session.user };
		const rsvp = await model.findOneAndRemove(filter);
		if (!rsvp) {
			req.flash('error', 'The RSVP could not be found');
			res.redirect('back');
		} else {
			req.flash('success', 'The RSVP has been deleted');
			res.redirect(`/events/${rsvp.event}`);
		}
	} catch (err) {
		next(err);
	}
};
