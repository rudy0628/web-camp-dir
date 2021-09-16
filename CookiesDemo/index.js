const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/greet', (req, res) => {
	const { name = 'No-name' } = req.cookies;
	res.send(`hey there ,${name}`);
});

app.get('/setname', (req, res) => {
	res.cookie('name', 'steve chicks');
	res.cookie('animal', 'chicken');
	res.send('Ok send you a cookie');
});

app.get('/getsignedcookie', (req, res) => {
	res.cookie('fruit', 'grape', { signed: true });
	res.send('Ok signed your food cookie!');
});

app.get('/verifyfruit', (req, res) => {
	console.log(req.cookies);
	console.log(req.signedCookies);
	res.send(req.signedCookies);
});

app.listen(3000, () => {
	console.log('listen to port 3000');
});
