import { LitElement, html, css } from 'lit-element';

export default class ChatWindowBody extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                /* Размеры окна чата */
                width: 100%;
                height: 76%;
                background-color: yellow;
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

customElements.define('chat-window-body', ChatWindowBody);