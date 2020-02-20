window.onload = () => {
    const sendButtonElement = document.querySelector('.send-button');
    const messageListElement = document.querySelector('.list-of-messages');
    const messageInputElement = document.querySelector('.message-text');
    messageInputElement.focus();

    const messageList = new MessageList(messageListElement);

    sendButtonElement.addEventListener('click', onButtonPush);
    document.addEventListener('keydown', onPressEnter);

    function onButtonPush () {
        messageInputElement.focus();
        messageList.addListElement(messageInputElement.value);
        messageInputElement.value = '';
    }

    function onPressEnter (e) {
        if (e.key === 'Enter') {
            messageList.addListElement(messageInputElement.value);
            messageInputElement.value = '';
        }
    }
};

class MessageList extends EventTarget {

    constructor(domElement) {
        super();
        this.list = domElement;
    }

    _buildMessageTemplate (messageText, fromMe = true) {
        const date = this.date;

        return `<div class="message ${fromMe ? 'message-from-me' : ''}">
            <p class="message-body">${messageText}</p>
            <span class="message-date">${date.hours}.${date.minutes}</span>        
        </div>`;
    }

    addListElement (messageText) {
        if (!messageText) {
            return;
        }

        const messageNode = document.createElement('div');
        messageNode.className = 'message-box';
        messageNode.innerHTML = this._buildMessageTemplate(messageText);

        this.list.append(messageNode);
        messageNode.scrollIntoView();

        this.dispatchEvent(new Event('messageList.addMessage'));
    }

    get date () {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes() < 10
            ? `0${date.getMinutes()}`
            : date.getMinutes();

        return {hours, minutes};
    }

    // removeListElement () {
    //     return;
    // }
    //
    // clearList () {
    //     return;
    // }
    //
    // fillList () {
    //     return;
    // }

}