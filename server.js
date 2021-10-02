console.log(`RESTARTING BY: ${new Date()}`);
const http = require('http');
const https = require('https');
const fs = require('fs');
const { parse } = require('url');
const path = require('path');
const next = require('next');

console.log('ENV', process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== 'production';
const pth = path.join(__dirname, '..', 'cle.ng4');
console.log('path:', pth);
const app = next({ dir: pth, dev });
console.log('NEXT APP', app);
const handle = app.getRequestHandler();
const port = 26956;
app.prepare().then(() => {
  const options = {
    key: fs.readFileSync(__dirname + '/certs/key.pem'),
    cert: fs.readFileSync(__dirname + '/certs/cert.pem'),
  };
  https
    .createServer(options, (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);

      handle(req, res, parsedUrl);
    })
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
});
