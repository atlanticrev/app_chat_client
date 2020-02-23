import MessageList from "./scripts/MessageList.js";
import WebsocketApi from "./scripts/WebsocketApi.js";

window.onload = () => {

    const WS_URL = `ws://localhost:3000`;

    const sendButtonElement = document.querySelector('.send-button');
    const messageInputElement = document.querySelector('.message-text');
    const messageListElement = document.querySelector('.list-of-messages');

    messageInputElement.focus();

    const messageList = new MessageList(messageListElement);

    const websocket = new WebsocketApi(WS_URL, messageList);
    websocket.openConnection();

    sendButtonElement.addEventListener('click', onButtonPush);
    document.addEventListener('keydown', onPressEnter);

    function onButtonPush () {
        /* @todo добавить эффект изменения при нажатии */
        messageInputElement.focus();
        websocket.dispatchEvent(new CustomEvent('messageSend', {detail: {message: messageInputElement.value}}));
        /* @todo Сделать по событию */
        messageList.addListElement(messageInputElement.value);
        messageInputElement.value = '';
    }

    function onPressEnter (e) {
        if (e.key === 'Enter') {
            /* @todo добавить фильтрацию символов */
            messageInputElement.focus();
            websocket.dispatchEvent(new CustomEvent('messageSend', {detail: {message: messageInputElement.value}}));
            /* @todo Сделать по событию */
            messageList.addListElement(messageInputElement.value);
            messageInputElement.value = '';
        }
    }

};