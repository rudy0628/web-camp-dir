const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

app.use(morgan('tiny'));

app.use((req, res, next) => {
	req.requestTime = Date.now();
	console.log(req.method, req.path);
	next();
});

app.use('/dogs', (req, res, next) => {
	console.log('I love dogs!!');
	next();
});

//not use on every single request, just use on /secret request!!
const verifyPassword = (req, res, next) => {
	const { password } = req.query;
	if (password === 'chicken') {
		next();
	}
	// res.send('oh!! you need a correct password!!');
	throw new AppError('Password required', 401);
};

app.get('/', (req, res) => {
	console.log(`request date: ${req.requestTime}`);
	res.send('Hello');
});

app.get('/error', (req, res) => {
	chicken.fly();
});

app.get('/secret', verifyPassword, (req, res) => {
	res.send('my secret is: hello !!');
});

app.get('/admin', (req, res) => {
	throw new AppError('you are not an Admin', 403);
});

app.use((req, res) => {
	res.status(404).send('not found');
});

//error handling middleware
// app.use((err, req, res, next) => {
// 	console.log('**********************');
// 	console.log('********ERROR*********');
// 	console.log('**********************');
// 	console.log(err);
// 	next(err);
// });

app.use((err, req, res, next) => {
	const { status = 500, message = 'something went wrong!' } = err;
	res.status(status).send(message);
});

app.listen(3000, () => {
	console.log('Listen to port 3000');
});
