const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');

const events = [
	{
		id: uuidv4(),
		category: 'meetups',
		title: 'KBBQ',
		host: 'Isidro',
		location: 'Iron Dish',
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
		location: 'Optimist Hall',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details: "Meetup here because we couldn't make up our minds on where to eat.",
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'meetups',
		title: 'Hiking Meetup',
		host: 'Isidro',
		location: 'Chestnut Knob Trail',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details:
			'A 5.3 mile hike with a 1,000 ft elevation gain. It should take about 2 hours to complete. We will meet at the trailhead at 9:00 am. Bring water and snacks. Dogs are welcome.',
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
		details:
			'Our first study session of the semester. We will be studying for our first test in 1212. Bring your notes and questions. We will meet in Woodward Hall room 101 at 6:00 pm. See you there!',
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'study',
		title: '2175',
		host: 'Isidro',
		location: 'Library',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details:
			'We gotta study for the test on Friday. Bring your notes and questions. We will meet in the library at 4:00 pm. See you there!',
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'study',
		title: '2181',
		host: 'Isidro',
		location: 'Woodward Hall',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details:
			'Homework 1 is due on Friday. We will meet in Woodward Hall room 101 at 6:00 pm. Bring your questions. See you there!',
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'gaming',
		title: 'TF2',
		host: 'Isidro',
		location: 'Discord',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details:
			'Scream Fortress is coming up. We will be playing TF2 on Friday at 6:00 pm. Join the discord server to play with us. See you there!',
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'gaming',
		title: "Baldur's Gate 3",
		host: 'Isidro',
		location: 'Discord',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details: 'Our weekly game session is coming up.',
		image: '/images/download.png',
	},
	{
		id: uuidv4(),
		category: 'gaming',
		title: 'Remnant',
		host: 'Isidro',
		location: 'Discord',
		start: DateTime.local(2021, 10, 1, 18, 0).toISO({ includeOffset: false }),
		end: DateTime.local(2021, 10, 1, 20, 0).toISO({ includeOffset: false }),
		details: 'Our weekly game session is coming up.',
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

console.log(DateTime.fromISO(events[0].start).toLocaleString(DateTime.DATETIME_MED));
