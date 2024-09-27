export enum Attribute3 {
    'image' = 'image',
    'clubpic' = 'clubpic',
    'clubname' = 'clubname',
    'likes' = 'likes',
    'comments' = 'comments',
    'author' = 'author',
    'desc' = 'desc',
};

class PostPopUp extends HTMLElement {
    image?: string;
    comments: string[] = [];
    clubname?: string;
    clubpic?: string;
    likes?: number;
    author?: string;
    desc?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addCloseHandler();
        this.addCommentHandler();  // Añadimos el evento de manejo de comentarios
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/postPopup/postPopup.css">
                <div class="popup-overlay">
                    <div class="popup">
                        <div class="popup-izq">
                            <div class="post-img">
                                <img src="${this.image}" alt="Post Image" class="post-image">
                            </div>
                        </div>
                        <div class="popup-der">
                            <button id="closePopup" class="close-btn">X</button>
                            <div class="club-info">
                                <img src="${this.clubpic}" alt="Club Picture" class="club-pic">
                                <h2>${this.clubname}</h2>
                            </div>
                            <div class="comments-section">
                                <div class="comments-list">
                                    ${this.comments.map(comment => `<p>@${this.author}${comment}</p>`).join('')}
                                </div>
                            </div>
                            <div class="post-description">
                                <p class="post-author">@${this.author}</p>
                                <p class="post-desc">${this.desc}</p>
                            </div>
                            <div class="input-wrapper-inputtext">
                                <i class="fa-solid fa-message" style="color: #999;"></i>
                                <input type="text" placeholder="Say something!" name="textInput" id="popupCommentInput">
                                <button type="submit" id="sendPopupComment">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    addCloseHandler() {
        const closeButton = this.shadowRoot?.querySelector<HTMLButtonElement>('#closePopup');
        closeButton?.addEventListener('click', () => {
            this.remove();
        });
    }

    addCommentHandler() {
        const input = this.shadowRoot?.querySelector<HTMLInputElement>('#popupCommentInput');
        const button = this.shadowRoot?.querySelector<HTMLButtonElement>('#sendPopupComment');
        
        if (input && button) {
            button.addEventListener('click', () => {
                const commentText = input.value.trim();
                if (commentText) {
                    this.comments.push(commentText);  
                    this.render();  
                    input.value = '';
                }
            });

            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    button.click();
                }
            });
        }
    }

    setPopupData(
        comments: string[], 
        clubname: string | undefined, 
        image: string | undefined, 
        clubpic: string | undefined, 
        author: string | undefined, 
        desc: string | undefined, 
        liked: boolean
    ) {
        this.comments = comments;
        this.clubname = clubname;
        this.image = image;
        this.clubpic = clubpic;
        this.author = author;
        this.desc = desc;
        this.render();  
    }
}

customElements.define('post-popup', PostPopUp);
export default PostPopUp;
