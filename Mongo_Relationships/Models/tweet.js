const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose
	.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Mongo connection open!');
	})
	.catch(err => {
		console.log('Oh no mongo connection error!');
		console.log(err);
	});

const UserSchema = new Schema({
	username: String,
	age: Number
});

const tweetSchema = new Schema({
	text: String,
	likes: Number,
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', UserSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
// 	// const user = new User({ username: 'chickenfan99', age: 61 });
// 	const user = await User.findOne({ username: 'chickenfan99' });
// 	const tweet2 = new Tweet({ text: 'hey chicken is good!!', likes: 777 });
// 	tweet2.user = user;
// 	user.save();
// 	tweet2.save();
// };

// makeTweets();

//populate can show all the information of user(the objectId in tweet)
const findTweet = async () => {
	const t = await Tweet.findOne({ text: 'hey chicken is good!!' }).populate('user', 'username');
	console.log(t);
};

findTweet();
