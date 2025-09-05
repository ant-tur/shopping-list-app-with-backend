const morgan = require('morgan');
const logger = require('./logger');

morgan.token('body', req => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body);
  }

  return '';
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  console.log(error.name);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { morgan, unknownEndpoint, errorHandler };
