
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  if (req.url === '/') {
    fs.readFile('index.html', function(err, data) {
      if (err) {
        res.writeHead(500);
        res.end('Kluda!');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
      }
    });

  } else if (req.url === '/style.css') {
    fs.readFile('style.css', function(err, data) {
      if (err) {
        res.writeHead(500);
        res.end('CSS kluda!');
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      }
    });

  } else if (req.url.startsWith('/api/sveiciens')) {
    const url = new URL(req.url, 'http://localhost');
    const vards = url.searchParams.get('vards') || 'draugs';

    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify({zina: 'Sveiks, ' + vards + '!'}));

  } else if (req.url === '/api/info') {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify({projekts: 'Sveicienu lietotne'}));

  } else {
    res.writeHead(404);
    res.end('Lapa nav atrasta');
  }

}).listen(3000);

console.log('Serveris darbojas: http://localhost:3000');
