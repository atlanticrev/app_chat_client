const express = require('express');
const http = require('http');
const Websocket = require('websocket').server;

const app = express();

//initialize a simple http server
const server = http.createServer(app);

const ws = new Websocket({
    httpServer: server,
    autoAcceptConnections: false
});

const clients = [];

ws.on('request', (request) => {
    /* @todo Фильтровать клиентов, недопускать повторного подключения того же клиента */
    const connection = request.accept('', request.origin);
    clients.push(connection);
    console.log(`connected: ${connection.remoteAddress}`, clients.length);

    connection.on('message', (message) => {
        const dataName = `${message.type}Data`;
        const data = message[dataName];
        // console.dir(data);
        console.log(`received: ${data}`,);

        /* Broadcasting */
        clients.forEach((client) => {
            if (connection !== client) {
                client.send(data);
            }
        });
    });

    connection.on('close', () => {
        console.log(`disconnected: ${connection.remoteAddress}`);
    });
});

/* @todo как точно работает express.static? */
app.use('/build', express.static('build'));

app.get('/', (request, response) => {
    console.log(`request -> `, request.url);
    response.sendFile(`${__dirname}/index.html`);
});

//start our server
server.listen(3000, () => {
    console.log(`listen -> port: 3000`);
});


// Old version
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