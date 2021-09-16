const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name must be not empty']
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	category: {
		type: String,
		lowercase: true,
		enum: ['fruit', 'vegetable', 'dairy']
	},
	farm: {
		type: Schema.Types.ObjectId,
		ref: 'Farm'
	}
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
