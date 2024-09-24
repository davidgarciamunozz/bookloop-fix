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
        switch (propName) {
            case Attribute.userpic:
                this.setUserpic(newValue);
                break;
            case Attribute.text:
                this.setText(newValue);
                break;
            case Attribute.buttontext:
                this.setButtontext(newValue);
                break;
            case Attribute.buttonimages:
                this.setButtonimages(newValue);
                break;
            case Attribute.inputtext:
                this.setInputtext(newValue);
                break;
            case Attribute.inputimage:
                this.setInputimage(newValue);
                break;
            case Attribute.club:
                this.setClub(newValue);
                break;
            case Attribute.post:
                this.setPost(newValue);
                break;
        }
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addFileInputListener();
    }

    addFileInputListener() {
        const fileInput = this.shadowRoot?.querySelector('.file-input') as HTMLInputElement;
        const filePlaceholder = this.shadowRoot?.querySelector('.file-placeholder') as HTMLSpanElement;

        if (fileInput && filePlaceholder) {
            fileInput.addEventListener('change', (event: Event) => {
                const target = event.target as HTMLInputElement;
                if (target.files && target.files.length > 0) {
                    filePlaceholder.textContent = target.files[0].name;
                } else {
                    filePlaceholder.textContent = this.inputimage || 'No input';
                }
            });
        }
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
                    <div class="input-wrapper-inputtext">
                        <i class="fa-solid fa-message" style="color: #999;"></i>
                        <input type="text" placeholder="${this.inputtext || 'No input'}">
                    </div>
                    <label class="input-wrapper-inputimage">
                        <i class="fa-solid fa-cloud-arrow-up" style="color: #999;"></i>
                        <span class="file-placeholder">${this.inputimage || 'No input'}</span>
                        <input type="file" class="file-input">
                    </label>
                </div>
                <div class='container-buttons-post'>
                    <button>${this.club || 'No Club'}<i class="fa-solid fa-users" style="color: #fff;"></i></button>
                    <button>${this.post || 'No Post'}</button>
                </div>
            </section>
            `;
        }
    }

    // Métodos setter
    setUserpic(value: string | undefined) {
        this.userpic = value;
    }

    setText(value: string | undefined) {
        this.text = value;
    }

    setButtontext(value: string | undefined) {
        this.buttontext = value;
    }

    setButtonimages(value: string | undefined) {
        this.buttonimages = value;
    }

    setInputtext(value: string | undefined) {
        this.inputtext = value;
    }

    setInputimage(value: string | undefined) {
        this.inputimage = value;
    }

    setClub(value: string | undefined) {
        this.club = value;
    }

    setPost(value: string | undefined) {
        this.post = value;
    }
}

customElements.define('new-post', NewPost);
export default NewPost;
