const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username cannot be blank!!']
	},
	password: {
		type: String,
		required: [true, 'Password cannot be blank!!']
	}
});

//define the statics call findAndValidate, just like the prototype in js object
userSchema.statics.findAndValidate = async function (username, password) {
	const foundUser = await this.findOne({ username });
	const isValid = await bcrypt.compare(password, foundUser.password);
	return isValid ? foundUser : false;
};

//before the user is save
userSchema.pre('save', async function (next) {
	//if password is not modified
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

module.exports = mongoose.model('User', userSchema);
