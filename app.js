const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const eventRoutes = require('./routes/eventRoutes.js');

const port = 3000;
const host = 'localhost';

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	res.render('index');
});

app.use('/events', eventRoutes);

app.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});
