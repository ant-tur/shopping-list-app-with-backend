require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Product = require('./models/product');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', req => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body);
  }

  return '';
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/products', (request, response, next) => {
  Product.find({})
    .then(products => {
      response.json(products);
    })
    .catch(error => next(error));
});

app.get('/api/products/:id', (request, response, next) => {
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

app.delete('/api/products/:id', (request, response, next) => {
  Product.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/products', (request, response, next) => {
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

app.put('/api/products/:id', (request, response, next) => {
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  console.log(error.name);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
