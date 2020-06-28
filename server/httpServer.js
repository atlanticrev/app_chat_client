const express = require('express');

const app = express();

/* @todo как точно работает express.static? */
app.use('/build', express.static('build'));

app.get('/', (request, response) => {
    console.log(`request -> `, request.url);
    response.sendFile(`${__dirname}/index.html`);
});

//start our websocketServer
app.listen(3000, () => {
    console.log(`listen -> port: 3000`);
});

// Without Express
// const http = require('http');
// const fs = require('fs');
//
// const websocketServer = http.createServer((request, response) => {
//     console.log(`request -> `, request.url);
//     response.writeHead(200, {'Content-type': 'text/html'});
//
//     const readStream = fs.createReadStream(`${__dirname}/index.html`, 'utf8');
//     readStream.pipe(response);
// });
//
// websocketServer.listen(3000);
// console.log(`listen -> port: 3000`);