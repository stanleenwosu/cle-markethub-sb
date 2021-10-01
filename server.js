const express = require('express');
const next = require('next');
const path = require('path');

console.log(1);
const port = 26902;
const dev = process.env.NODE_ENV !== 'production';
console.log('path', path.join(__dirname, '..', 'www/cle.ng'));
const app = next({ dir: path.join(__dirname, '..', 'www/cle.ng'), dev });
const handle = app.getRequestHandler();

console.log(app);
app.prepare().then(() => {
  console.log(3);
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
