import { dispatch, addObserver, appState } from '../../store/index';
import { getClubsAction, addClubForUser } from '../../store/actions';
import { Screens } from '../../types/store';

export enum AttributeDiscoverLandingCards {
    'uid' = 'uid',
    'image' = 'image',
    'name' = 'name',
    'members' = 'members',
    'button' = 'button',
}

class DiscoverLandingCards extends HTMLElement {
    uid?: string; // Changed from number to string
    image?: string;
    name?: string;
    members?: string;
    button?: string;

    static get observedAttributes() {
        return Object.keys(AttributeDiscoverLandingCards) as Array<AttributeDiscoverLandingCards>;
    }

    attributeChangedCallback(propName: AttributeDiscoverLandingCards, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeDiscoverLandingCards.uid:
                this[propName] = newValue || undefined; // Simply assign the string value
                break;
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
        this.uid = undefined;
        this.image = '';
        this.name = '';
        this.members = '';
        this.button = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../src/components/DiscoverLandingCards/DiscoverLandingCards.css';
            this.shadowRoot.appendChild(link);

            const card = this.ownerDocument.createElement('div');
            card.className = 'card';

            const image = this.ownerDocument.createElement('img');
            image.className = 'image';
            image.src = this.image || 'No image found';
            image.alt = this.name || 'No name found';
            card.appendChild(image);

            const name = this.ownerDocument.createElement('h2');
            name.className = 'name';
            name.textContent = this.name || 'No name found';
            card.appendChild(name);

            const members = this.ownerDocument.createElement('p');
            members.className = 'members';
            members.textContent = this.members || 'No members found';
            card.appendChild(members);

            const button = this.ownerDocument.createElement('button');
            button.className = 'button';
            button.textContent = this.button || 'Join';

            if (this.button === 'Joined') {
                button.disabled = true;
                button.style.backgroundColor = '#808080';
            } else {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    if (!this.uid) {
                        console.error("No uid found for card");
                        return;
                    }
                    console.log("Button clicked for uid:", this.uid);
                    button.disabled = true;
                    button.textContent = 'Adding...';
                    
                    try {
                        const success = await this.addToClubsLanding();
                        if (success) {
                            button.textContent = 'Joined';
                            button.style.backgroundColor = '#808080';
                            button.disabled = true;
                        } else {
                            button.disabled = false;
                            button.textContent = 'Join';
                        }
                    } catch (error) {
                        console.error("Error adding to clubs:", error);
                        button.disabled = false;
                        button.textContent = 'Join';
                    }
                });
            }
            
            card.appendChild(button);
            this.shadowRoot.appendChild(card);
        }
    }

    async addToClubsLanding() {
        try {
            const userId = appState.user;
            console.log("Current userId:", userId);
    
            if (!userId) {
                console.error("No user ID found in appState");
                return false;
            }
    
            if (!this.uid) {
                console.error("No uid found for card");
                return false;
            }
    
            const clubData = {
                uid: this.uid, // Now passing string uid
                image: this.image || '',
                name: this.name || '',
                members: this.members || '',
            };
    
            console.log("Attempting to add club with data:", clubData);
            const success = await addClubForUser(clubData);
            return success;
    
        } catch (error) {
            console.error("Error in addToClubsLanding:", error);
            return false;
        }
    }
}

customElements.define('discover-landing-card', DiscoverLandingCards);
export default DiscoverLandingCards;