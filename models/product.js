const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const productSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true, trim: true },
  amount: { type: Number, min: 1 },
  checked: { type: Boolean, default: false },
});

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Product', productSchema);
