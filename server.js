console.log(`RESTARTING BY: ${new Date()}`);
const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const next = require('next');

console.log(1);
console.log('ENV', process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== 'production';
const pth = path.join(__dirname, '..', 'cle.ng4');
console.log('path:', pth);
const app = next({ dir: pth, dev });
console.log(2, app);
const handle = app.getRequestHandler();
console.log(3);
const port = 26956;
app.prepare().then(() => {
  console.log(4);
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
