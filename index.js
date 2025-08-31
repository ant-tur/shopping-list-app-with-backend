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

// let products = [
//   {
//     id: '1',
//     name: 'Water',
//     amount: 1,
//     checked: false,
//   },
//   {
//     id: '2',
//     name: 'Bread',
//     amount: 1,
//     checked: false,
//   },
//   {
//     id: '3',
//     name: 'eggs',
//     amount: 20,
//     checked: false,
//   },
//   {
//     id: '4',
//     name: 'hello',
//     amount: 1,
//     checked: false,
//   },
// ];

app.get('/api/products', (request, response) => {
  Product.find({}).then(products => {
    response.json(products);
  });
});

app.get('/api/products/:id', (request, response) => {
  const id = request.params.id;
  const product = products.find(prod => prod.id === id);

  if (product) {
    response.json(product);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/products/:id', (request, response) => {
  const id = request.params.id;
  products = products.filter(prod => prod.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId =
    products.length > 0 ? Math.max(...products.map(n => Number(n.id))) : 0;

  return String(maxId + 1);
};

app.post('/api/products', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'product name missing',
    });
  }

  product = {
    name: body.name,
    checked: body.checked || false,
    amount: body.amount,
    id: generateId(),
  };

  products = products.concat(product);
  response.json(product);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
