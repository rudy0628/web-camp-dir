const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection open!!');
    })
    .catch(err => {
        console.log('OH no Error!!');
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        //required is the name must be there
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        require: true,
        min: [0, 'price must be positive!!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        enum: ['S', 'L', 'XL']
    }
});

// productSchema.methods.greet = function () {
// 	console.log('Hello!!! Hi!! HOWDY!!');
// 	console.log(`- from ${this.name}`);
// };

// model instance method "toggleOnSale"
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
};

productSchema.methods.addPrice = function () {
    this.price++;
    return this.save();
};

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Cycling Jersey' });
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    await foundProduct.addPrice();
    console.log(foundProduct);
};

Product.fireSale().then(res => console.log(res));

// findProduct();
// const bike = new Product({ name: 'Cycling Jersey', price: 29.5, size: 'XS' });

// bike.save()
// 	.then(data => {
// 		console.log('IT worked');
// 		console.log(data);
// 	})
// 	.catch(err => {
// 		console.log('OH no Error');
// 		console.log(err);
// 	});

//runValidators is set for validation in Schema
// Product.findOneAndUpdate({ name: 'Bike helmet' }, { price: 19.99 }, { new: true, runValidators: true })
// 	.then(data => {
// 		console.log('IT worked');
// 		console.log(data);
// 	})
// 	.catch(err => {
// 		console.log('OH no Error');
// 		console.log(err);
// 	});
