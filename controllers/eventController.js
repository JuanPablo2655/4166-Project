const model = require('../models/event.js');

exports.index = (req, res) => {
	const categories = model.find();
	res.render('events/index', { categories });
};

exports.new = (req, res) => {
	res.render('events/new');
};

exports.create = (req, res, next) => {
	const event = req.body;
	event.image = `/images/${req.file.filename}`;
	model.validate(event);
	model.create(event);
	res.redirect('/events');
};

exports.show = (req, res, next) => {
	try {
		const id = req.params.id;
		const event = model.findById(id);
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
