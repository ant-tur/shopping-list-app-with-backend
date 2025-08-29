const http = require('http');

const products = [
  {
    id: 'f780',
    name: 'Water',
    amount: 1,
    checked: false,
  },
  {
    id: '1815',
    name: 'Bread',
    amount: 1,
    checked: false,
  },
  {
    id: '086d',
    name: 'eggs',
    amount: 20,
    checked: false,
  },
  {
    id: '5797',
    name: 'hello',
    amount: 1,
    checked: false,
  },
];

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(products));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
