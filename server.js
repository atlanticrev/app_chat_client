const express = require('express');

const app = express();

app.use('/build', express.static('build'));

app.get('/', (request, response) => {
    console.log(`request -> `, request.url);
    response.sendFile(`${__dirname}/index.html`);
});

app.listen(3000);
console.log(`listen -> port: 3000`);

// const http = require('http');
// const fs = require('fs');
//
// const server = http.createServer((request, response) => {
//     console.log(`request -> `, request.url);
//     response.writeHead(200, {'Content-type': 'text/html'});
//
//     const readStream = fs.createReadStream(`${__dirname}/index.html`, 'utf8');
//     readStream.pipe(response);
// });
//
// server.listen(3000);
// console.log(`listen -> port: 3000`);