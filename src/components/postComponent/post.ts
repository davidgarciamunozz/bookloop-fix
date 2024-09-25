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
    comments?: number;
    author?: string;
    desc?: string;
    userComments: string[] = [];
    likes: number = 0;
    liked: boolean = false;

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
                    this.addComments(); // Agregar el evento para enviar comentarios
                    this.addLikeHandler();
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
                        <span class="likes" id="likeButton">
                        <i class="${this.liked ? 'fas fa-heart' : 'far fa-heart'}"></i> 
                        ${this.likes}
                        </span>
                        <span class="comments"><i class="fas fa-comment"></i> ${this.userComments.length}</span>
                        </div>
                        <div class="post--author">
                        <h3>@${this.author}</h3>
                        <p>${this.desc}</p>
                        </div>
                        </div>
                        <div class='container-inputs'>
                        <div class="input-wrapper-inputtext">
                        <i class="fa-solid fa-message" style="color: #999;"></i>
                        <input type="text" placeholder="Say something!" name="textInput" id="commentInput">
                        <button type="submit" id="sendComment">Send</button>
                        </div>
                        <div class="comments-list">
                        ${this.userComments.map(comment => `<p>${comment}</p>`).join('')}
                        </div>
                        </div>
                        </section>
                        `;
                    }
                }
                
                
                addComments() {
                       const input = this.shadowRoot?.querySelector<HTMLInputElement>('#commentInput');
                       const button = this.shadowRoot?.querySelector<HTMLButtonElement>('#sendComment');
                       
                       if (input && button) {
                           button.addEventListener('click', () => {
                               const commentText = input.value.trim();
                               if (commentText) {
                                   this.userComments.push(commentText);
                                   this.comments = this.userComments.length;
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
               
                   addLikeHandler() {
                       const likeButton = this.shadowRoot?.querySelector<HTMLSpanElement>('#likeButton');
                       
                       if (likeButton) {
                           likeButton.addEventListener('click', () => {
                               this.liked = !this.liked; 
                               this.likes += this.liked ? 1 : -1; 
                               this.render(); 
                           });
                       }
                   }
            }
            
            
            
            
            
customElements.define('post-component', Post);
export default Post;
