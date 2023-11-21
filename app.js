const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const mainRoutes = require('./routes/mainRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/events';

const app = express();
app.set('view engine', 'ejs');

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: url,
		}),
		cookie: {
			maxAge: 60 * 60 * 1000,
		},
	}),
);
app.use(flash());

app.use((req, res, next) => {
	res.locals.user = req.session.user;
	res.locals.successMessages = req.flash('success');
	res.locals.errorMessages = req.flash('error');
	next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
	const err = new Error('The page you are looking for does not exist');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if (!err.status) {
		err.status = 500;
		err.message = 'Internal Server Error';
	}
	res.status(err.status).render('error', { err });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
