const express = require('express');
const http = require('http');
const https = require('https');
const url = require('url');
const app = express();

app.get('/proxy', (req, res) => {
  const proxyUrl = req.query.url;

  if (!proxyUrl) {
    res.status(400).send('Missing URL parameter');
    return;
  }

  const options = url.parse(proxyUrl);
  const protocol = options.protocol === 'https:' ? https : http;

  protocol.get(options, (proxyRes) => {
    res.set(proxyRes.headers);
    proxyRes.pipe(res);
  }).on('error', (err) => {
    res.status(500).send(err.message);
  });
});

app.listen(1234, () => {
  console.log('Server started on port 1234');
});
