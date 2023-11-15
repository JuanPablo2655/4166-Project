const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = ['meetups', 'study', 'gaming', 'food', 'miscellaneous'];

const eventSchema = new Schema({
	category: {
		type: String,
		enum: categories,
		required: [true, 'Category is required'],
	},
	title: {
		type: String,
		required: [true, 'Title is required'],
		minLength: [3, 'Title must be at least 3 characters'],
	},
	host: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	location: {
		type: String,
		required: [true, 'Location is required'],
		minLength: [3, 'Location must be at least 3 characters'],
	},
	start: {
		type: Date,
		required: [true, 'Start date is required'],
	},
	end: {
		type: Date,
		required: [true, 'End date is required'],
	},
	details: {
		type: String,
		required: [true, 'Details are required'],
		minLength: [10, 'Details must be at least 10 characters'],
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
	},
});

module.exports = mongoose.model('Event', eventSchema);
