import * as components from '../../components/index';
import '../../components/userInfo/userInfo';
import '../../components/navBar/navBar';
import '../../components/userMenu/userMenu';
import '../../components/newPost/newPost';
import UserInfo, { Attribute } from '../../components/userInfo/userInfo';
import { dataUsers } from '../../data/dataUsers';

class Main extends HTMLElement {
    user: UserInfo[] = [];
    currentUserPic: string = ''; 
    isUserContainerVisible: boolean = true; 

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.currentUserPic = dataUsers[0].userpic;

        dataUsers.forEach(dataUser => {
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
        // Escuchar el evento personalizado emitido por NavBar
        this.addEventListener('toggle-user-container', () => this.toggleUserContainer());
    }

    toggleUserContainer() {
        this.isUserContainerVisible = !this.isUserContainerVisible;
        const userContainer = this.shadowRoot?.querySelector('.user-container');
        const postContainer = this.shadowRoot?.querySelector('.post-container');
        const container = this.shadowRoot?.querySelector('.container');
        
        if (userContainer && postContainer && container) {
            // Ocultar/Mostrar el user-container
            userContainer.classList.toggle('hidden', !this.isUserContainerVisible);
    
            // Expandir el post-container y el container principal si user-container está oculto
            if (!this.isUserContainerVisible) {
                postContainer.classList.add('expanded');
                container.classList.add('full-width');
            } else {
                postContainer.classList.remove('expanded');
                container.classList.remove('full-width');
            }
        }
    }
    
    render() {
        if (this.shadowRoot) {
            const navBar = this.ownerDocument.createElement('nav-bar');
            navBar.setAttribute('icon', "../src/assets/logos/big_logo.png");
            navBar.setAttribute('img', "../src/assets/logos/medium_logo.png");
            navBar.setAttribute('input', "Search");

            const container = this.ownerDocument.createElement('section');
            container.className = 'container';

            const userContainer = this.ownerDocument.createElement('section');
            userContainer.className = 'user-container';

            this.user.forEach(userCard => {
                userContainer.appendChild(userCard);
            });

            const userMenu = this.ownerDocument.createElement('user-menu');
            userMenu.setAttribute('home', '#');
            userMenu.setAttribute('clubs', '#');
            userMenu.setAttribute('discover', '#');
            userMenu.setAttribute('help', '#');
            userMenu.setAttribute('setting', '#');

            userContainer.appendChild(userMenu);
            container.appendChild(userContainer);

            const postContainer = this.ownerDocument.createElement('section');
            postContainer.className = 'post-container';

            const newPost = this.ownerDocument.createElement('new-post');
            newPost.setAttribute('userpic', this.currentUserPic);
            newPost.setAttribute('text', 'Create new post');
            newPost.setAttribute('buttontext', 'Text');
            newPost.setAttribute('buttonimages', 'Images');
            newPost.setAttribute('inputtext', 'Share something...');
            newPost.setAttribute('inputimage', 'Drag and drop or upload media');
            newPost.setAttribute('club', 'Select a Club');
            newPost.setAttribute('post', 'Post');

            postContainer.appendChild(newPost);
            container.appendChild(postContainer);

            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/screens/main/main.css">
            `;
            this.shadowRoot.appendChild(navBar);
            this.shadowRoot.appendChild(container);
        }
    }
}

customElements.define('main-page', Main);
export default Main;
