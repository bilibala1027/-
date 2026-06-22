const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || '127.0.0.1';
const root = path.resolve(__dirname, '..', 'dist');

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

http
  .createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, `http://${host}`).pathname);
    const target = path.join(root, pathname === '/' ? 'index.html' : pathname);

    if (!target.startsWith(root)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(target, (error, data) => {
      if (error) {
        fs.readFile(path.join(root, 'index.html'), (fallbackError, fallback) => {
          res.writeHead(fallbackError ? 404 : 200, { 'Content-Type': types['.html'] });
          res.end(fallbackError ? 'Not found' : fallback);
        });
        return;
      }

      res.writeHead(200, {
        'Content-Type': types[path.extname(target)] || 'application/octet-stream',
      });
      res.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`Portfolio preview: http://${host}:${port}/`);
  });
