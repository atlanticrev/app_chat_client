const express = require('express');
const http = require('http');
const Websocket = require('websocket').server;

const app = express();

const websocketServer = http.createServer(app);

const websocketServerUpgraded = new Websocket({
    httpServer: websocketServer,
    autoAcceptConnections: false
});

/* @todo Если мы различаем connections с из разных вкладок,
     то вытащить информацию оттуда чтобы точечно посылать сообщения */
const clients = [];

websocketServerUpgraded.on('request', (request) => {
    /* @todo Фильтровать клиентов,
         недопускать повторного подключения того же клиента */
    const connection = request.accept('', request.origin);
    clients.push(connection);
    console.log(`connected from address: ${connection.remoteAddress}`);

    connection.on('message', (message) => {
        const dataName = `${message.type}Data`;
        const data = message[dataName];
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

//start our websocketServer
websocketServer.listen(3000, () => {
    console.log(`listen -> port: 3000`);
});