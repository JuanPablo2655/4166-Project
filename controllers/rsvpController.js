const model = require('../models/rsvp.js');

exports.createOrUpdate = async (req, res, next) => {
	try {
		const filter = { event: req.body.event, user: req.session.user };
		const update = { status: req.body.status.tolowercase() };
		await model.findOneAndUpdate(filter, update, { upsert: true });
		req.flash('success', 'Your RSVP has been saved');
		res.redirect(`/events/${rsvp.event}`);
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
