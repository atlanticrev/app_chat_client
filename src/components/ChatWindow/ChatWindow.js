import { LitElement, html, css } from 'lit-element';

import ChatWindowHeader from "./components/ChatWindowHeader";
import ChatWindowBody from "./components/ChatWindowBody";
import ChatWindowFooter from "./components/ChatWindowFooter";

export default class ChatWindow extends LitElement {

    static get styles() {
        return css`
            :host {        
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                /* Размеры окна чата */
                padding: 30px 25px;
                min-width: 400px;
                max-width: 1200px;
                min-height: 860px;
                background-color: var(--chat-background);
                border-radius: 45px;
                box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
            }    
        `;
    }

    static get properties() {
        return {
            message: {type: String}
        }
    }

    constructor() {
        super();
        // this.message = 'Loading';
        // this.addEventListener('stuff-loaded', (e) => { this.message = e.detail } );
    }

    render() {
        return html`
            <chat-window-header></chat-window-header>
            <chat-window-body></chat-window-body>
            <chat-window-footer></chat-window-footer>
        `;
    }

}

customElements.define('chat-window', ChatWindow);