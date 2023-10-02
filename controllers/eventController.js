const model = require('../models/event.js');

exports.index = (req, res) => {
	const categories = model.find();
	res.render('events/index', { categories });
};

exports.new = (req, res) => {
	res.render('events/new');
};

exports.create = (req, res) => {
	const event = req.body;
	model.validate(event);
	model.create(event);
	res.redirect('/events');
};

exports.show = (req, res) => {
	const id = req.params.id;
	const event = model.findById(id);
	res.render('events/event', { event });
};

exports.edit = (req, res) => {
	const id = req.params.id;
	const event = model.findById(id);
	res.render('events/edit', { event });
};

exports.update = (req, res) => {
	const id = req.params.id;
	const updatedEvent = req.body;
	model.validate(updatedEvent, true);
	model.update(id, updatedEvent);
	res.redirect('/events');
};

exports.delete = (req, res) => {
	const id = req.params.id;
	model.delete(id);
	res.redirect('/events');
};
