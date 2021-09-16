const mongoose = require('mongoose');
const Product = require('./product');
//destructure the Schema from mongoose
const { Schema } = mongoose;

const farmSchema = Schema({
	name: {
		type: String,
		required: [true, 'Farm must have a name']
	},
	city: {
		type: String
	},
	email: {
		type: String,
		required: [true, 'Email required']
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'product'
		}
	]
});

//use the mongoose middleware to delete all the product with the specific farm
farmSchema.post('findOneAndDelete', async function (farm) {
	if (farm.products.length) {
		const res = await Product.deleteMany({ _id: { $in: farm.products } });
		console.log(res);
	}
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
