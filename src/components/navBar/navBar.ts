export enum Attribute {
    'icon' = 'icon',
    'img' = 'img',
    'input' = 'input',
};

class NavBar extends HTMLElement {
    icon?: string;
    img?: string;
    input?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute) as Array<Attribute>;
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue; // icon, img, input
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/navBar/navBar.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
                <section class='container'>
                <div class='container-img-icon'>
                    <!-- <img src="${this.icon || 'No Icon'}" alt="BookLoop icon"> -->
                    <i class="fa-solid fa-bars" style="color: #f9f5f3;"></i>
                </div>

                <div class='container-img-logo'>
                    <img src="${this.img || 'No Image'}" alt="BookLoop Logo">
                </div>

                <div class='container-search'>
                    <i class="fa-solid fa-magnifying-glass" style="color: #322316;"></i>
                    <input type="text" placeholder="${this.input || 'Search'}">
                </div>
                </section>
            `;
        }
    }
}

customElements.define('nav-bar', NavBar);
export default NavBar;