// import '../../components/navBar/navBar';
import * as components from '../../components/index';
import '../../components/userInfo/userInfo';
import '../../components/navBar/navBar';
import '../../components/userMenu/userMenu';
import UserInfo, { Attribute } from '../../components/userInfo/userInfo';
import {dataUsers } from '../../data/dataUsers';

class Main extends HTMLElement {
    user: UserInfo[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        dataUsers.forEach(dataUser => {
            // console.log(dataUser);
            
            const userCard = this.ownerDocument.createElement('user-info') as UserInfo;
            userCard.setAttribute('background', dataUser.background);
            userCard.setAttribute('userpic', dataUser.userpic);
            userCard.setAttribute('name', dataUser.name);
            userCard.setAttribute('at', dataUser.at);
            this.user.push(userCard);
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <nav-bar 
                    icon="../src/assets/logos/big_logo.png"
                    img="../src/assets/logos/medium_logo.png"
                    input="Search"
                ></nav-bar>
            `;
            this.user.forEach((e) => {
                this.shadowRoot?.appendChild(e);
            // console.log('Clubs Landing connected');
            })
            this.shadowRoot.innerHTML += `
            <user-menu
            home='#'
            clubs='#'
            discover='#'
            help='#'
            setting='#'
            ></user-menu>
            `
        }
    }    
}
customElements.define('main-page', Main);
export default Main;