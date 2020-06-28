import { LitElement, html, css } from 'lit-element';

export default class ChatWindowFooter extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;
                /* Размеры окна чата */
                width: 100%;
                height: 12%;
                background-color: gray;
            }    
        `;
    }

    static get properties() {
        return {
            chatPartnerName: {type: String},
            chatPartnerImg: {type: String}
        }
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div></div>
        `;
    }

}

customElements.define('chat-window-footer', ChatWindowFooter);