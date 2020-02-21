export default class ServerApi {
    constructor(url) {
        this.url = url;
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            console.log('Соединение установлено');
        };
        this.socket.onclose = () => {
            console.log('Соединение закрыто');
        };
        this.socket.onerror = () => {
            console.log('Произошла ошибка');
        };
        this.socket.onmessage = (e) => {
            const message = e.data;
        };
    }

    sendMessage (message) {
        this.socket.send(message);
    }

    closeConnection () {
        this.socket.close();
    }
}