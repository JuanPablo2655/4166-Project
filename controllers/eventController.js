const model = require('../models/event.js');
const { DateTime } = require('luxon');

exports.index = (req, res) => {
	const categories = model.find();
	res.render('events/index', { categories });
};

exports.new = (req, res) => {
	res.render('events/new');
};

exports.create = (req, res, next) => {
	try {
		const event = req.body;
		event.image = `/images/${req.file.filename}`;
		model.validate(event);
		model.create(event);
		res.redirect('/events');
	} catch (error) {
		const err = new Error(error.message);
		err.status = 404;
		next(err);
	}
};

exports.show = (req, res, next) => {
	try {
		const id = req.params.id;
		const event = JSON.parse(JSON.stringify(model.findById(id)));
		event.start = DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_MED);
		event.end = DateTime.fromISO(event.end).toLocaleString(DateTime.DATETIME_MED);
		res.render('events/event', { event });
	} catch (error) {
		const err = new Error(error.message);
		err.status = 404;
		next(err);
	}
};

exports.edit = (req, res, next) => {
	try {
		const id = req.params.id;
		const event = model.findById(id);
		res.render('events/edit', { event });
	} catch (error) {
		const err = new Error(error.message);
		err.status = 404;
		next(err);
	}
};

exports.update = (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedEvent = req.body;
		console.log(req.file);
		updatedEvent.image = `/images/${req.file.filename}`;
		model.validate(updatedEvent, true);
		model.update(id, updatedEvent);
		res.redirect(`/events/${id}`);
	} catch (error) {
		const err = new Error(error.message);
		err.status = 404;
		next(err);
	}
};

exports.delete = (req, res, next) => {
	try {
		const id = req.params.id;
		model.delete(id);
		res.redirect('/events');
	} catch (error) {
		const err = new Error(error.message);
		err.status = 404;
		next(err);
	}
};
