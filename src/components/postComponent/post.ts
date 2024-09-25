export enum Attribute2 {
    'clubpic' = 'clubpic',
    'clubname' = 'clubname',
    'image' = 'image',
    'likes' = 'likes',
    'comments' = 'comments',
    'author' = 'author',
    'desc' = 'desc',

};

class Post extends HTMLElement {
    clubpic?: string;
    clubname?: string;
    image?: string;
    likes?: number;
    comments?: number;
    author?: string;
    desc?: string;


    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute2) as Array<Attribute2>;
    }

    attributeChangedCallback(propName: Attribute2, oldValue: string | number | undefined, newValue: string | number | undefined) {
        switch (propName) {
            case Attribute2.clubpic:
                this.clubpic = newValue as string;
                break;
            case Attribute2.clubname:
                this.clubname = newValue as string;
                break;
            case Attribute2.image:
                this.image = newValue as string;
                break;
            case Attribute2.likes:
                this.likes = newValue ? Number(newValue) : 0; // Convertimos a number
                break;
            case Attribute2.comments:
                this.comments = newValue ? Number(newValue) : 0; // Convertimos a number
                break;
            case Attribute2.author:
                this.author = newValue as string;
                break;
            case Attribute2.desc:
                this.desc = newValue as string;
                break;
            default:
                break;
        }
    
        this.render();
    }
    

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/postComponent/post.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

            <section class="post--container">
                <div class="post--header">
                    <img src="${this.clubpic}" alt="Club Picture" class="club-pic">
                    <div class="club-info">
                        <h2>${this.clubname}</h2>
                    </div>
                </div>
                <img src="${this.image}" alt="Post Image" class="post-image">
                <div class="post--body">
                    <div class="post--info">
                        <span class="likes"><i class="fas fa-heart"></i> ${this.likes}</span>
                        <span class="comments"><i class="fas fa-comment"></i> ${this.comments}</span>
                    </div>
                    <div class="post--author">
                        <h3>${this.author}</h3>
                        <p>${this.desc}</p>
                    </div>
                </div>
            </section>

            `;
        }
    }
}

customElements.define('post-component', Post);
export default Post;