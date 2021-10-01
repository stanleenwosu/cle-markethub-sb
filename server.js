const express = require('express');
const next = require('next');
const path = require('path');

console.log(1);
const port = 26902;
const dev = process.env.NODE_ENV !== 'production';
const pth = path.join(__dirname, '..', 'cle.ng/.next/server');
console.log('path:', pth);
const app = next({ dir: pth, dev });
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
