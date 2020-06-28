import MessageList from "./MessageList.js";
import WebsocketApi from "./WebsocketApi.js";
import config from "./config/config.js";

export default class Chat {

    constructor() {
        this.onPressEnter = this.onPressEnter.bind(this);
        this.onSendButtonPush = this.onSendButtonPush.bind(this);
        this.init();
    }

    init () {
        this.sendButtonElement = document.querySelector('.send-button');
        this.messageInputElement = document.querySelector('.message-text');
        this.messageListElement = document.querySelector('.list-of-messages');

        this.messageList = new MessageList(this.messageListElement);
        this.websocketApi = new WebsocketApi(config.WEBSOCKET_URL, this.messageList);

        this.sendButtonElement.addEventListener('click', this.onSendButtonPush);
        document.addEventListener('keydown', this.onPressEnter);

        this.websocketApi.openConnection();
        this.messageInputElement.focus();
    }

    /**
     * @param message
     * @return {string}
     * @private
     */
    _buildMessageTemplate (message) {
        return JSON.stringify({
            sender: config.ID,
            receiver: config.CONTACT_ID,
            data: message
        });
    }

    sendMessage () {
        this.messageInputElement.focus();
        this.websocketApi.dispatchEvent(new CustomEvent('messageSend', {detail: {message: this._buildMessageTemplate(this.messageInputElement.value)}}));
        /* @todo Сделать по событию */
        this.messageList.addListElement(this.messageInputElement.value);
        this.messageInputElement.value = '';
    }

    onSendButtonPush () {
        /* @todo добавить эффект изменения при нажатии */
        this.sendMessage();
    }

    onPressEnter (e) {
        if (e.key === 'Enter') {
            /* @todo добавить фильтрацию символов */
            this.sendMessage();
        }
    }

}