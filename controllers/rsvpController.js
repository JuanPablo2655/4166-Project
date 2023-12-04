const model = require('../models/rsvp.js');

exports.create = async (req, res, next) => {
	try {
		const rsvp = await model.create({
			event: req.body.event,
			user: req.session.user,
			status: req.body.status,
		});
		req.flash('success', 'Your RSVP has been saved');
		res.redirect(`/events/${rsvp.event}`);
	} catch (err) {
		next(err);
	}
};

exports.update = async (req, res, next) => {
	try {
		const event = res.body.event;
		const user = res.session.user;
		const rsvp = await model.findOneAndUpdate({ event, user }, req.body, { new: true });
		if (!rsvp) {
			req.flash('error', 'The RSVP could not be found');
			res.redirect('back');
		} else {
			await rsvp.updateOne(req.body);
			req.flash('success', 'The RSVP has been updated');
			res.redirect(`/events/${rsvp.event}`);
		}
	} catch (err) {
		next(err);
	}
};
