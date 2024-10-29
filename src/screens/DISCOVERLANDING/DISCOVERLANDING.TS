import * as components from '../../components/index';
import '../../components/userInfo/userInfo';
import '../../components/navBar/navBar';
import '../../components/userMenu/userMenu';
import UserInfo, { Attribute } from '../../components/userInfo/userInfo';
import { dataUsers } from '../../data/dataUsers';
import '../../components/postPopUp/postPopUp';
import PostPopUp, { Attribute3 } from '../../components/postPopUp/postPopUp';
import '../../components/elements/clubInfo/clubInfo';
import '../../components/clubsCard/clubsCard';
import ClubsCard, { AttributeClubsCard } from '../../components/clubsCard/clubsCard';
import { dataClubs } from '../../data/dataClubs';

class DiscoverLanding extends HTMLElement {
    user: UserInfo[] = [];
    currentUserPic: string = '';

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
    }

    render() {
        if (this.shadowRoot) {
            // Primero limpiamos el shadowRoot
            this.shadowRoot.innerHTML = '';
            
            // Agregamos el stylesheet
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../src/screens/DISCOVERLANDING/DISCOVERLANDING.css';
            this.shadowRoot.appendChild(link);

            // Creamos los elementos
            const navBar = this.ownerDocument.createElement('nav-bar');
            navBar.setAttribute('icon', "../src/assets/logos/big_logo.png");
            navBar.setAttribute('img', "../src/assets/logos/medium_logo.png");
            navBar.setAttribute('input', "Search");

            const container = this.ownerDocument.createElement('section');
            container.className = 'container';

            const userContainer = this.ownerDocument.createElement('section');
            userContainer.className = 'user-container';

            // Agregamos los user cards
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
            container.appendChild(postContainer);

            const clubsContainer = this.ownerDocument.createElement('section');
            clubsContainer.className = 'clubs-container';

            if (dataClubs && Array.isArray(dataClubs)) {
                const clubsCard1 = this.ownerDocument.createElement('clubs-card') as ClubsCard;
                clubsCard1.setAttribute('cardtitle', 'Clubs');
                clubsCard1.setAttribute('buttontext', 'Your Clubs');
                clubsCard1.setAttribute('cardcolor', '#6471C7');
                clubsCard1.setAttribute('buttoncolor', '#6471C7');
                clubsContainer.appendChild(clubsCard1);

                const clubsCard2 = this.ownerDocument.createElement('clubs-card') as ClubsCard;
                clubsCard2.setAttribute('cardtitle', 'Discover');
                clubsCard2.setAttribute('buttontext', 'Discover now');
                clubsCard2.setAttribute('cardcolor', '#C2BE4D');
                clubsCard2.setAttribute('buttoncolor', '#C2BE4D');
                clubsContainer.appendChild(clubsCard2);
            }

            container.appendChild(clubsContainer);

            // Agregamos los elementos principales al shadowRoot
            this.shadowRoot.appendChild(navBar);
            this.shadowRoot.appendChild(container);
            
            console.log(container);
        }
    }
}

customElements.define('app-discover-landing', DiscoverLanding);
export default DiscoverLanding;