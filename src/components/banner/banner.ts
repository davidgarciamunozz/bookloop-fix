export enum Attribute {
    'utitle' = 'utitle',
    'text' = 'text',
    'image' = 'image',
};

class Banner extends HTMLElement {
    utitle?: string;
    text?: string;
    image?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute) as Array<Attribute>;
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
            // Create the main container (section)
            const container = this.ownerDocument.createElement('section');
            container.className = 'container';
            this.shadowRoot.appendChild(container);

            // Create the container for user action items
            const actionUserElement = this.ownerDocument.createElement('div');
            actionUserElement.className = 'action-user-element';
            container.appendChild(actionUserElement);
        }
    }
}

customElements.define('banner-component', Banner);
export default Banner;