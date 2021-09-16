const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');

const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose
	.connect('mongodb://localhost:27017/farmStandTake2', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('mongo connection open!!');
	})
	.catch(err => {
		console.log('OH no mongo connection Error!!');
		console.log(err);
	});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

//*****************FARM ROUTES*****************

app.get('/farms', async (req, res) => {
	const farms = await Farm.find({});
	res.render('farms/index', { farms });
});

app.get('/farms/new', (req, res) => {
	res.render('farms/new');
});

app.get('/farms/:id', async (req, res) => {
	const farm = await Farm.findById(req.params.id).populate('products');
	res.render('farms/show', { farm });
});

app.post('/farms', async (req, res) => {
	const farm = new Farm(req.body);
	await farm.save();
	res.redirect('/farms');
});

//add a new product to the specific farm page
app.get('/farms/:id/products/new', async (req, res) => {
	const { id } = req.params;
	const farm = await Farm.findById(id);
	res.render('products/new', { categories, farm });
});

//delete the farm, and delete the farm product is in the farm.js file
app.delete('/farms/:id', async (req, res) => {
	const farm = await Farm.findByIdAndDelete(req.params.id);
	res.redirect('/farms');
});

//add a new product to the specific farm
app.post('/farms/:id/products', async (req, res) => {
	const { id } = req.params;
	const farm = await Farm.findById(id);
	const { name, price, category } = req.body;
	//create an new Product data
	const product = new Product({ name, price, category });
	//push the product in farm
	farm.products.push(product);
	//add the farm to which product is
	product.farm = farm;
	await farm.save();
	await product.save();
	res.redirect(`/farms/${id}`);
});

//*****************PRODUCT ROUTES*****************

//call this function to return a new function, what new function do is to catch the error(error handling)
function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch(e => next(e));
	};
}

//render all product pages(ejs)
app.get(
	'/products',
	wrapAsync(async (req, res, next) => {
		const { category } = req.query;
		if (category) {
			const products = await Product.find({ category });
			res.render('products/index', { products, category });
		} else {
			const products = await Product.find({});
			res.render('products/index', { products, category: 'All' });
		}
	})
);

//add a new product page(ejs)
app.get('/products/new', (req, res) => {
	res.render('products/new', { categories });
});

//add a new product action
app.post(
	'/products',
	wrapAsync(async (req, res, next) => {
		const newProduct = new Product(req.body);
		await newProduct.save();
		res.redirect(`/products/${newProduct._id}`);
	})
);

//show a product details page(ejs)
app.get(
	'/products/:id',
	wrapAsync(async (req, res, next) => {
		const { id } = req.params;
		const product = await Product.findById(id).populate('farm', 'name');
		if (!product) {
			//this will throw into the "next"
			throw new AppError('Product Not Found', 404);
		}
		res.render('products/show', { product });
	})
);

//edit a product page(ejs)
app.get(
	'/products/:id/edit',
	wrapAsync(async (req, res, next) => {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			throw new AppError('Product Not Found', 404);
		}
		res.render('products/edit', { product, categories });
	})
);

//edit a product action
app.put(
	'/products/:id',
	wrapAsync(async (req, res, next) => {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
		res.redirect(`/products/${product._id}`);
	})
);

//delete a product action
app.delete(
	'/products/:id',
	wrapAsync(async (req, res, next) => {
		const { id } = req.params;
		const deletedProduct = await Product.findByIdAndRemove(id);
		res.redirect('/products');
	})
);

//define the error message and status code using AppError class
const handleValidationErr = err => {
	console.dir(err);
	return new AppError(`Validation Error... ${err.message}`, 400);
};
//if err.name is validationError
app.use((err, req, res, next) => {
	console.log(err.name);
	if (err.name === 'ValidationError') err = handleValidationErr(err);
	//this next will pass the err to error handling middleware
	next(err);
});

//error handling middleware
app.use((err, req, res, next) => {
	const { status = 500, message = 'Something went wrong!!' } = err;
	res.status(status).send(message);
});

app.listen(3000, () => {
	console.log('app is listening at port 3000');
});
