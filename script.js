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

    _buildMessageTemplate (messageText) {
        return `<div class="message-item message-from-me">
            <h3>Message #${MessageList.messageCounter++}</h3>
            <p>${messageText}</p>        
        </div>`;
    }

    addListElement (messageText) {
        if (!messageText) {
            return;
        }

        const messageNode = document.createElement('div');
        messageNode.className = 'message';
        messageNode.innerHTML = this._buildMessageTemplate(messageText);

        this.list.append(messageNode);
        messageNode.scrollIntoView();

        this.dispatchEvent(new Event('messageList.addMessage'));
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

MessageList.messageCounter = 1;