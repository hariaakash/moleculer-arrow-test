const mongoose = require('mongoose');

const host = process.env.MONGODB_HOST || 'localhost';
const port = process.env.MONGODB_PORT || 27017;
const db = process.env.MONGODB_DB || 'test';

const dbURI = `mongodb://${host}:${port}/${db}`;

const connect = () => {
	mongoose
		.connect(dbURI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
		.catch(() => {
			setTimeout(connect, 5000);
		});

	mongoose.connection.on('disconnected', () => {
		console.log('Lost connection');
	});

	mongoose.connection.on('connected', () => {
		console.log('Connected');
	});
};

module.exports = connect;
