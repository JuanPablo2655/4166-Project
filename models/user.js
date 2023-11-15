const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'username is required'],
		unique: [true, 'username is already taken'],
		minlength: [4, 'username must be at least 4 characters'],
	},
	firstName: {
		type: String,
		required: [true, 'first name is required'],
		minlength: [2, 'first name must be at least 2 characters'],
	},
	lastName: {
		type: String,
		required: [true, 'last name is required'],
		minlength: [2, 'last name must be at least 2 characters'],
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		unique: [true, 'this email address as already been used'],
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		minlength: [8, 'password must be at least 8 characters'],
	},
});

userSchema.pre('save', async function (next) {
	const user = this;
	if (!user.isModified('password')) return next();
	const hash = await bcrypt.hash(user.password, 10).catch(err => next(err));
	user.password = hash;
	next();
});

userSchema.methods.comparePassword = async function (password) {
	const user = this;
	const result = await bcrypt.compare(password, user.password).catch(err => err);
	return result;
};

module.exports = mongoose.model('User', userSchema);
