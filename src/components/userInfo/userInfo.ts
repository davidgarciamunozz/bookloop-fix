export enum Attribute {
    'background' = 'background',
    'userpic' = 'userpic',
    'name' = 'name',
    'at' = 'at',
};

class UserInfo extends HTMLElement {
    background?: string;
    userpic?: string;
    name?: string;
    at?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute) as Array<Attribute>;
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue; // background, userpic, name, at
        this.render();
    }

    connectedCallback() {
        this.render();
        // console.log('User Info connected');
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/userInfo/userInfo.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <section class='container'>
                <div class='container-background'>
                    <img src="${this.background || 'No Image'}" alt="Background">
                        <div class='container-userpic'>
                            <img src="${this.userpic || 'No Image'}" alt="User Picture">
                        </div>
                        <div class='container-text'>
                            <h2>${this.name || 'No Name'}</h2>
                            <p>${this.at || 'No At'}</p>
                        </div>
                </div>
            </section>
            `;
        }
    }
}

customElements.define('user-info', UserInfo);
export default UserInfo;