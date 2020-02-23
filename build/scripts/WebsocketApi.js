export default class WebsocketApi extends EventTarget {

    constructor(url, messageList) {
        super();
        this.url = url;
        this.socket = null;
        this.messageList = messageList;
        this.addEventListener('messageSend', this.sendMessage);
    }

    openConnection () {
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
            const message = JSON.parse(e.data).message_data;
            console.log(`${this.constructor.name} received message <-`, message);
            this.messageList.dispatchEvent(new CustomEvent('messageReceived', {detail: {message}}));
        };
    }

    sendMessage (e) {
        console.log('%c%s', 'color:#7B93CE;', `${this.constructor.name} sending message ->`, e.detail.message);
        this.socket.send(e.detail.message);
    }

    closeConnection () {
        this.socket.close();
    }

}