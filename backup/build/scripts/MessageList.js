export default class MessageList extends EventTarget {

    constructor(domElement) {
        super();
        this.list = domElement;
        this.addEventListener('messageReceived', this.onMessageReceived);
    }

    onMessageReceived (e) {
        console.log(`${this.constructor.name} received message <-`, e.detail.message);
        this.addListElement(e.detail.message, {fromMe: false});
    }

    _buildMessageTemplate (messageText, fromMe) {
        /* @todo сюда надо подставлять время поста из базы */
        /* @todo определиться с форматом сообщения */
        const date = this.date;
        return `<div class="message ${fromMe ? 'message-from-me' : ''}">
            <p class="message-body">${messageText}</p>
            <span class="message-date">${date.hours}.${date.minutes}</span>        
        </div>`;
    }

    addListElement (messageText, options = {fromMe: true}) {
        if (!messageText) {
            return;
        }
        const messageNode = document.createElement('div');
        messageNode.className = 'message-box';
        messageNode.innerHTML = this._buildMessageTemplate(messageText, options.fromMe);
        this.list.append(messageNode);

        messageNode.scrollIntoView();
    }

    get date () {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes() < 10
            ? `0${date.getMinutes()}`
            : date.getMinutes();
        return {hours, minutes};
    }

    clearList () {
        this.list.innerHTML = '';
    }

    fillList () {
        return;
    }

}