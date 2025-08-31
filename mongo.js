const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://anttur85:${password}@cluster0.qr9w7pk.mongodb.net/shoppingListApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  amount: { type: Number, min: 1 },
  checked: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

const product = new Product({
  name: 'water',
  amount: 1,
  checked: false,
});

product.save().then(result => {
  console.log('product saved!');
  mongoose.connection.close();
});

// Product.find({ name: 'eggs' }).then(result => {
//   console.log(result);
//   mongoose.connection.close();
// });
