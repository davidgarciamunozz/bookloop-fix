export enum AttributeDiscoverLandingCards {
    'uid' = 'uid',
    'image' = 'image',
    'name' = 'name',
    'members' = 'members',
}
class DiscoverLandingCards extends HTMLElement {
    uid?: number;
    image?: string;
    name?: string;
    members?: string;

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
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
        }
    }
}

customElements.define('discover-landing-card', DiscoverLandingCards);
export default DiscoverLandingCards;
