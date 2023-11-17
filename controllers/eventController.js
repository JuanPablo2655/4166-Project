const model = require('../models/event.js');
const { DateTime } = require('luxon');

exports.index = async (req, res) => {
	const categoryList = await model.collection.distinct('category');
	const events = await model.find().catch(err => next(err));
	const categories = categoryList.map(category => {
		return { title: category, events: events.filter(event => event.category === category) };
	});
	res.render('events/index', { categories });
};

exports.new = (req, res) => {
	res.render('events/new');
};

exports.create = async (req, res, next) => {
	try {
		const event = new model(req.body);
		if (Object.keys(event).length === 0) {
			const err = new Error("Can't create empty event");
			err.status = 400;
			throw err;
		}
		event.image = `/images/${req.file.filename}`;
		event.host = req.session.user;
		await event.save().catch(err => {
			if (err.name === 'ValidationError') {
				err.status = 400;
			}
			throw err;
		});
		res.redirect('/events');
	} catch (error) {
		next(error);
	}
};

exports.show = async (req, res, next) => {
	try {
		const id = validateId(req.params.id);
		const event = await model.findById(id).populate('host', 'username').lean();
		if (!event) {
			const err = new Error(`Cannot find event with id ${req.params.id}`);
			err.status = 404;
			throw err;
		}
		event.start = DateTime.fromJSDate(event.start).toLocaleString(DateTime.DATETIME_MED);
		event.end = DateTime.fromJSDate(event.end).toLocaleString(DateTime.DATETIME_MED);
		console.log(event);
		res.render('events/event', { event });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.edit = async (req, res, next) => {
	try {
		const id = validateId(req.params.id);
		const event = await model.findById(id).lean();
		if (!event) {
			const err = new Error(`Cannot find event with id ${req.params.id}`);
			err.status = 404;
			throw err;
		}
		event.start = DateTime.fromJSDate(event.start).toISO({ includeOffset: false });
		event.end = DateTime.fromJSDate(event.end).toISO({ includeOffset: false });
		console.log(event);
		res.render('events/edit', { event });
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	try {
		const id = validateId(req.params.id);
		const event = req.body;
		if (req.file) {
			event.image = `/images/${req.file.filename}`;
		}
		if (Object.keys(event).length === 0) {
			const err = new Error('No fields to update');
			err.status = 400;
			throw err;
		}
		const updatedEvent = await model
			.findByIdAndUpdate(id, event, { useFindAndModify: false, runValidators: true })
			.catch(err => {
				if (err.name === 'ValidationError') {
					err.status = 400;
				}
				throw err;
			});
		if (!updatedEvent) {
			const err = new Error(`Cannot find event with id ${req.params.id}`);
			err.status = 404;
			throw err;
		}
		res.redirect(`/events/${id}`);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.delete = async (req, res, next) => {
	try {
		const id = validateId(req.params.id);
		const event = await model.findByIdAndDelete(id, { useFindAndModify: false }).catch(err => next(err));
		if (!event) {
			const err = new Error(`Cannot find event with id ${req.params.id}`);
			err.status = 404;
			throw err;
		}
		res.redirect('/events');
	} catch (error) {
		next(error);
	}
};

function validateId(id) {
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		const err = new Error('Invalid event id');
		err.status = 400;
		throw err;
	}
	return id;
}
