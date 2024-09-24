export enum Attribute {
    'userpic' = 'userpic',
    'text' = 'text',
    'buttontext' = 'buttontext',
    'buttonimages' = 'buttonimages',
    'inputtext' = 'inputtext',
    'inputimage' = 'inputimage',
    'club' = 'club',
    'post' = 'post',
};

class NewPost extends HTMLElement {
    userpic?: string;
    text?: string;
    buttontext?: string;
    buttonimages?: string;
    inputtext?: string;
    inputimage?: string;
    club?: string;
    post?: string;

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
            <link rel="stylesheet" href="../src/components/newPost/newPost.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <section class='container'>
                <div class='container-userpic'>
                    <a href="#">
                        <img src="${this.userpic || 'No User Pic'}" alt="User Picture">
                    </a>
                    <h2>${this.text || 'No Text'}</h2>
                </div>
                <div class='container-button'>
                    <button>${this.buttontext || 'No Button Text'}</button>
                    <button>${this.buttonimages || 'No Button Images'}</button>
                </div>
                <div class='container-inputs'>
                    <i class="fa-solid fa-message" style="color: #322316;">
                        <input type="text" placeholder="${this.inputtext || 'No input'}">
                    </i>
                    <i class="fa-solid fa-cloud-arrow-up" style="color: #322316;">
                        <input type="text" placeholder="${this.inputimage || 'No input'}">
                    </i>
                </div>
                <div class='container-buttons'>
                <button>${this.club || 'No Club'}<i class="fa-solid fa-users" style="color: #322316;"></i></button>
                <button>${this.post || 'No Post'}</button>
                </div>
            </section>
            `;
        }
    }
}

customElements.define('new-post', NewPost);
export default NewPost;