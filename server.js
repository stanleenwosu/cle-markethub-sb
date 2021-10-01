console.log(`RESTARTING BY: ${new Date()}`);
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

console.log(1);
const dev = process.env.NODE_ENV !== 'production';
const pth = path.join(__dirname, '..', 'cle.ng2/server');
console.log('path:', pth);
const app = next({ dir: pth, dev });
const handle = app.getRequestHandler();
const port = 26956;
app.prepare().then(() => {
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
