import MessageList from "./scripts/MessageList.js";

window.onload = () => {
    const sendButtonElement = document.querySelector('.send-button');
    const messageListElement = document.querySelector('.list-of-messages');
    const messageInputElement = document.querySelector('.message-text');

    messageInputElement.focus();

    const messageList = new MessageList(messageListElement);

    sendButtonElement.addEventListener('click', onButtonPush);
    document.addEventListener('keydown', onPressEnter);

    function onButtonPush () {
        /* @todo добавить эффект изменения при нажатии */
        messageInputElement.focus();
        messageList.addListElement(messageInputElement.value);
        messageInputElement.value = '';
    }

    function onPressEnter (e) {
        if (e.key === 'Enter') {
            /* @todo добавить фильтрацию символов */
            messageList.addListElement(messageInputElement.value);
            messageInputElement.value = '';
        }
    }
};