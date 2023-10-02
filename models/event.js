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
		image: 'https://t.ly/j5vIF',
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
		image: 'https://t.ly/j5vIF',
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
		image: 'https://t.ly/j5vIF',
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
		image: 'https://t.ly/j5vIF',
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
	return events.find(event => event.id === id);
};

exports.create = event => {
	event.id = uuidv4();
	event.host = 'Isidro';
	events.push(event);
};

exports.update = (id, updatedEvent) => {
	const event = events.find(event => event.id === id);
	Object.assign(event, updatedEvent);
};

exports.delete = id => {
	const index = events.findIndex(event => event.id === id);
	events.splice(index, 1);
};

exports.validate = (event, update = false) => {
	if (!event.category) throw new Error('Category is required.');
	if (!event.title) throw new Error('Title is required.');
	// if (!event.host) throw new Error('Host is required.');
	if (!event.location) throw new Error('Location is required.');
	if (!event.start) throw new Error('Start is required.');
	if (!event.end) throw new Error('End is required.');
	if (!event.details) throw new Error('Details is required.');
	if (!update && !event.image) throw new Error('Image is required.');
	return true;
};
