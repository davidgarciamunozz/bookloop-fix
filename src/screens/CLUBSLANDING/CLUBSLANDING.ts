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
import '../../components/banner/banner';
import Banner, { AttributeBanner } from '../../components/banner/banner';

class ClubsLanding extends HTMLElement {
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
            this.shadowRoot.innerHTML = '';
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../src/screens/CLUBSLANDING/CLUBSLANDING.css';
            this.shadowRoot.appendChild(link);

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
            container.appendChild(postContainer);

            const clubsContainer = this.ownerDocument.createElement('section');
            clubsContainer.className = 'clubs-container';

            const banner = this.ownerDocument.createElement('banner-component') as Banner;
            banner.setAttribute(AttributeBanner.utitle, 'Millions of clubs picked for you!');
            banner.setAttribute(AttributeBanner.text, 'Register in any club for FREE and start experiencing a new way of living your favorite literary stories.');
            banner.setAttribute(AttributeBanner.image, 'https://github.com/ItsSilva/bookloop/blob/juanito/src/assets/bannerIMG/handBanner.png?raw=true');
            banner.setAttribute('bg-color', '#6471c7');
            postContainer.appendChild(banner);

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

            this.shadowRoot.appendChild(navBar);
            this.shadowRoot.appendChild(container);
            
        }
    }
}

customElements.define('app-clubs-landing', ClubsLanding);
export default ClubsLanding;