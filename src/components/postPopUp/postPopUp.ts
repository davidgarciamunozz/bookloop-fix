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
                    <div class="popup-content">
                        <button id="closePopup" class="close-btn">X</button>
                        <h2>${this.clubname}</h2>
                        <img src="${this.clubpic}" alt="Club Picture" class="club-pic">
                        <img src="${this.image}" alt="Post Image" class="post-image">
                        <p class="post-desc">${this.desc}</p>
                        <div class="comments-section">
                            <h3>Comments</h3>
                            <div class="comments-list">
                                ${this.comments.map(comment => `<p>${comment}</p>`).join('')}
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

    setPopupData(description: string, comments: string[], clubname: string, image: string, clubpic: string) {
        this.desc = description;
        this.comments = comments;
        this.clubname = clubname;
        this.image = image;
        this.clubpic = clubpic;
    }
}

customElements.define('post-popup', PostPopUp);
export default PostPopUp;
