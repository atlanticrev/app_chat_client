export default class MessageList extends EventTarget {

    constructor(domElement) {
        super();
        this.list = domElement;
    }

    _buildMessageTemplate (messageText, fromMe = true) {
        /* @todo сюда надо подставлять время поста из базы */
        /* @todo определиться с форматом сообщения */
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

    clearList () {
        this.list.innerHTML = '';
    }

    fillList () {
        return;
    }

}