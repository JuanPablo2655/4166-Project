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
			const err = new Error('You cannot RSVP to your own event');
			err.status = 401;
			throw err;
		}
		await model.findOneAndUpdate(filter, update, { upsert: true }).catch(err => next(err));
		req.flash('success', 'Your RSVP has been saved');
		res.redirect(`/events/${req.body.event}`);
	} catch (err) {
		next(err);
	}
};
