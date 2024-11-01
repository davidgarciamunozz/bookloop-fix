import { dispatch, addObserver, appState } from '../../store/index';
import { navigate, getDiscoverCardsAction } from '../../store/actions';
import { Screens } from '../../types/store';

export enum AttributeDiscoverLandingCards {
    'uid' = 'uid',
    'image' = 'image',
    'name' = 'name',
    'members' = 'members',
    'button' = 'button',
}

class DiscoverLandingCards extends HTMLElement {
    uid?: number;
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
                this[propName] = newValue ? Number(newValue) : undefined;
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
        // Inicializar propiedades
        this.uid = undefined;
        this.image = '';
        this.name = '';
        this.members = '';
        this.button = '';
    }

    async connectedCallback() {
        if (appState.cards.length === 0) {
            const action = await getDiscoverCardsAction();
            dispatch(action);
        } else {
            this.render();
        }
    }

    navegateToDiscoverMain() {
        dispatch(navigate(Screens.DISCOVERMAIN));
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
            
            // uid as a data attribute
            card.setAttribute('data-uid', this.uid ? this.uid.toString() : '');

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
            button.textContent = 'Join';
            // Add the uid to the button
            button.setAttribute('data-uid', this.uid ? this.uid.toString() : '');
            card.appendChild(button);

            this.shadowRoot.appendChild(card);

            button.addEventListener('click', this.navegateToDiscoverMain.bind(this));
        }
    }
}

customElements.define('discover-landing-card', DiscoverLandingCards);
export default DiscoverLandingCards;