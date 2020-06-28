import { LitElement, html, css } from 'lit-element';

export default class ChatWindowHeader extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: flex-start;
                box-sizing: border-box;
                /* Размеры окна чата */
                width: 100%;
                height: 12%;
                background-color: transparent;
            }
            
            .avatar {
                display: block;
                width: 50px;
                height: 50px;
                margin-right: 15px;
                background-color: black;
                border-radius: 50%;
            }
            
            .name {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                width: 50%;
                height: 100%;
                background-color: transparent;
            }
            
            .name span {
                font-family: "Ubuntu";
                font-weight: normal;
                color: white;
                font-size: 21px;
                letter-spacing: 1.5px;
            }    
        `;
    }

    static get properties() {
        return {
            partnerName: {type: String},
            partnerImgSrc: {type: String}
        }
    }

    constructor() {
        super();
        this.partnerName = 'Peter Schtoltz';
        this.partnerImgSrc = 'http://res.mcrate.su/avatars/223856030.jpg';
    }

    render() {
        return html`
            <img class="avatar" src="${this.partnerImgSrc}" alt="">
            <div class="name">
                <span>${this.partnerName}</span>
            </div>
        `;
    }

}

customElements.define('chat-window-header', ChatWindowHeader);