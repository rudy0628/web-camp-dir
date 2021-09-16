const bcrypt = require('bcrypt');

const hashPassword = async pw => {
	const hash = await bcrypt.hash(pw, 12);
	console.log(hash);
};

const login = async (pw, hashPw) => {
	const result = await bcrypt.compare(pw, hashPw);
	if (result) {
		console.log('welcome!!');
	} else {
		console.log('try again!');
	}
};

// hashPassword('monkey');
login('monkeyff', '$2b$12$eM29qwKYWmYP4gqnswtr7ugeUp5/5F/y5qx9J725wOjYMf8jZ8Nau');
