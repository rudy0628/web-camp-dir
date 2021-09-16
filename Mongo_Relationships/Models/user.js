const mongoose = require('mongoose');
mongoose
	.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Mongo connection open!');
	})
	.catch(err => {
		console.log('Oh no mongo connection error!');
		console.log(err);
	});

const userSchema = new mongoose.Schema({
	first: String,
	last: String,
	addresses: [
		{
			_id: { id: false },
			street: String,
			city: String,
			state: String,
			country: String
		}
	]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
	const u = new User({
		first: 'Harry',
		last: 'Potter'
	});
	u.addresses.push({
		street: '123 Sesame St.',
		city: 'New York',
		state: 'NY',
		country: 'USA'
	});
	const res = await u.save();
	console.log(res);
};

const addAddress = async id => {
	const user = await User.findById(id);
	user.addresses.push({
		street: '456 Sesame St.',
		city: 'Chicago',
		state: 'CH',
		country: 'USA'
	});
	const res = await user.save();
	console.log(res);
};

addAddress('61232dbde918bc0ac8c29c89');

// makeUser();
