export enum AttributeBanner {
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
        return Object.keys(AttributeBanner) as Array<AttributeBanner>;
    }

    attributeChangedCallback(propName: AttributeBanner, oldValue: string | undefined, newValue: string | undefined) {
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

            // Create the container for banner text
            const textContainer = this.ownerDocument.createElement('div');
            textContainer.className = 'action-user-element';
            container.appendChild(textContainer);

            // Create title element
            const title = this.ownerDocument.createElement('h1');
            title.className = 'title';
            title.textContent = this.utitle? this.utitle : 'No title provided';
            textContainer.appendChild(title);

            // Create text element
            const text = this.ownerDocument.createElement('p');
            text.className = 'text';
            text.textContent = this.text? this.text : 'No text provided';
            textContainer.appendChild(text);


        }
    }
}

customElements.define('banner-component', Banner);
export default Banner;