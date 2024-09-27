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
                        <div class="post-stats">
                            <span><i class="fas fa-heart"></i> ${this.likes} Likes</span>
                            <span><i class="fas fa-user"></i> @${this.author}</span>
                        </div>
                        <p class="post-desc">${this.desc}</p>
                        <div class="comments-section">
                            <h3>Comments</h3>
                            <div class="comments-list">
                                ${this.comments.map(comment => `<p>${comment}</p>`).join('')}
                            </div>
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

    setPopupData(description: string | undefined, comments: string[], clubname: string |undefined, image: string |undefined, clubpic: string |undefined, author: string | undefined, liked: boolean) {
        this.desc = description;
        this.comments = comments;
        this.clubname = clubname;
        this.image = image;
        this.clubpic = clubpic;
    }
}

customElements.define('post-popup', PostPopUp);
export default PostPopUp;
