const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statuses = ['yes', 'no', 'maybe'];

const rsvpSchema = new Schema({
	event: {
		type: Schema.Types.ObjectId,
		ref: 'Event',
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	status: {
		type: String,
		enum: statuses,
		required: [true, 'Status is required'],
	},
});

module.exports = mongoose.model('rsvp', rsvpSchema);
