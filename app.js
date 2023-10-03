const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const mainRoutes = require('./routes/mainRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/', mainRoutes);
app.use('/events', eventRoutes);

app.use((req, res, next) => {
	const err = new Error('The page you are looking for does not exist');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if (!err.status) {
		err.status = 500;
		// err.message = 'Internal Server Error';
	}
	res.status(err.status).render('error', { err });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
