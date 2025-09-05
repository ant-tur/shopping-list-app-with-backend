const productsRouter = require('express').Router();
const Product = require('../models/product');

// GET all
productsRouter.get('/', (request, response, next) => {
  Product.find({})
    .then(products => {
      response.json(products);
    })
    .catch(error => next(error));
});

// GET by id
productsRouter.get('/:id', (request, response, next) => {
  Product.findById(request.params.id)
    .then(product => {
      if (product) {
        response.json(product);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

//DELETE
productsRouter.delete('/:id', (request, response, next) => {
  Product.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

//POST
productsRouter.post('/', (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'product name missing',
    });
  }

  const product = new Product({
    name: body.name,
    amount: body.amount,
  });

  product
    .save()
    .then(savedProduct => {
      response.json(savedProduct);
    })
    .catch(error => next(error));
});

//PUT
productsRouter.put('/:id', (request, response, next) => {
  const { name, amount, checked } = request.body;

  Product.findById(request.params.id)
    .then(product => {
      if (!product) {
        return response.status(404).end();
      }

      product.name = name;
      product.amount = amount;
      product.checked = checked;

      return product.save().then(updatedProduct => {
        response.json(updatedProduct);
      });
    })
    .catch(error => next(error));
});

module.exports = productsRouter;
