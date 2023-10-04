const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');

const events = [
	{
		id: uuidv4(),
		category: 'meetups',
		title: 'KBBQ',
		host: 'Isidro',
		location: 'Woodward Hall',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details: 'Food Meetup after a long summer of not meeting up.',
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'meetups',
		title: 'Food Meetup',
		host: 'Isidro',
		location: 'Woodward Hall',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details: 'Food Meetup after a long summer of not meeting up.',
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'meetups',
		title: 'Hiking Meetup',
		host: 'Isidro',
		location: 'Woodward Hall',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details: 'Food Meetup after a long summer of not meeting up.',
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'study',
		title: '1212',
		host: 'Isidro',
		location: 'Woodward Hall',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details: 'Food Meetup after a long summer of not meeting up.',
		image: '/images/download.png',
	},
];

exports.find = () => {
	const categories = this.findAllCategories();
	return categories.map(category => {
		return {
			title: category,
			events: events.filter(event => event.category === category),
		};
	});
};

exports.findAllCategories = () => {
	return [...new Set(events.map(event => event.category))];
};

exports.findById = id => {
	const event = events.find(event => event.id === id);
	if (!event) throw new Error(`Cannot find event with id ${id}`);
	return event;
};

exports.create = event => {
	event.id = uuidv4();
	event.host = 'Isidro';
	events.push(event);
};

exports.update = (id, updatedEvent) => {
	const event = events.find(event => event.id === id);
	if (!event) throw new Error(`Cannot find event with id ${id}`);
	Object.assign(event, updatedEvent);
};

exports.delete = id => {
	const index = events.findIndex(event => event.id === id);
	if (index === -1) throw new Error(`Cannot find event with id ${id}`);
	events.splice(index, 1);
};

exports.validate = (event, update = false) => {
	const errors = [];
	if (!event.category) errors.push('category');
	if (!event.title) errors.push('title');
	// if (!event.host) errors.push('host');
	if (!event.location) errors.push('location');
	if (!event.start) errors.push('start');
	if (!event.end) errors.push('end');
	if (!event.details) errors.push('details');
	if (!update && !event.image) errors.push('image');
	if (errors.length > 0) throw new Error(`These entry is missing: ${errors.join(', ')}`);
	return true;
};
