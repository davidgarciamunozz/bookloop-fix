export enum Attribute {
    userpic = 'userpic',
    text = 'text',
    buttontext = 'buttontext',
    buttonimages = 'buttonimages',
    inputtext = 'inputtext',
    inputimage = 'inputimage',
    club = 'club',
    post = 'post',
}

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
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addFileInputListener();
        this.addButtonListeners();
        this.setDefaultButton();
    }

    addButtonListeners() {
        const textButton = this.shadowRoot?.querySelector('.button-text') as HTMLButtonElement;
        const imageButton = this.shadowRoot?.querySelector('.button-images') as HTMLButtonElement;
        const inputText = this.shadowRoot?.querySelector('.input-wrapper-inputtext') as HTMLElement;
        const inputImage = this.shadowRoot?.querySelector('.input-wrapper-inputimage') as HTMLElement;

        textButton?.addEventListener('click', () => {
            inputText?.classList.remove('hidden');
            inputImage?.classList.add('hidden');
            this.updateButtonStyles(textButton, imageButton);
        });

        imageButton?.addEventListener('click', () => {
            inputText?.classList.add('hidden');
            inputImage?.classList.remove('hidden');
            this.updateButtonStyles(imageButton, textButton);
        });
    }

    updateButtonStyles(selectedButton: HTMLButtonElement | null, unselectedButton: HTMLButtonElement | null) {
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
        if (unselectedButton) {
            unselectedButton.classList.remove('selected');
        }
    }

    setDefaultButton() {
        const textButton = this.shadowRoot?.querySelector('.button-text') as HTMLButtonElement;
        const inputText = this.shadowRoot?.querySelector('.input-wrapper-inputtext') as HTMLElement;
        const inputImage = this.shadowRoot?.querySelector('.input-wrapper-inputimage') as HTMLElement;

        if (textButton) {
            this.updateButtonStyles(textButton, null);
            inputText?.classList.remove('hidden');
            inputImage?.classList.add('hidden'); 
        }
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
            <form class='container'>
                <div class='container-userpic'>
                    <a href="#">
                        <img src="${this.userpic || 'No User Pic'}" alt="User Picture">
                    </a>
                    <h2>${this.text || 'No Text'}</h2>
                </div>
                <div class='container-button'>
                    <button type="button" class="button-text">${this.buttontext || 'No Button Text'}</button>
                    <button type="button" class="button-images">${this.buttonimages || 'No Button Images'}</button>
                </div>
                <div class='container-inputs'>
                    <div class="input-wrapper-inputtext">
                        <i class="fa-solid fa-message" style="color: #999;"></i>
                        <input type="text" placeholder="${this.inputtext || 'No input'}" name="textInput">
                    </div>
                    <label class="input-wrapper-inputimage hidden">
                        <i class="fa-solid fa-cloud-arrow-up" style="color: #999;"></i>
                        <span class="file-placeholder">${this.inputimage || 'No input'}</span>
                        <input type="file" class="file-input" name="imageInput">
                    </label>
                </div>
                <div class='container-buttons-post'>
                    <button type="button">${this.club || 'No Club'}<i class="fa-solid fa-users" style="color: #fff;"></i></button>
                    <button type="submit">${this.post || 'No Post'}</button>
                </div>
            </form>
            `;
        }
    }
}

customElements.define('new-post', NewPost);
export default NewPost;
