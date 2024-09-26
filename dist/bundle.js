(()=>{"use strict";var t,e,s,n;!function(t){t.background="background",t.userpic="userpic",t.name="name",t.at="at"}(t||(t={}));class i extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.keys(t)}attributeChangedCallback(t,e,s){this[t]=s,this.render()}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="../src/components/userInfo/userInfo.css">\n            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">\n            <section class='container'>\n            <img src="${this.background||"No Image"}" alt="Background">\n            <div class='container-background'>\n            <div class='container-userpic'>\n                <a href="#">\n                    <img src="${this.userpic||"No Image"}" alt="User Picture">\n                </a>\n                    </div>\n                    <div class='container-text'>\n                        <h2>${this.name||"No Name"}</h2>\n                        <p>${this.at||"No At"}</p>\n                    </div>\n                </div>\n            </section>\n            `)}}customElements.define("user-info",i),function(t){t.icon="icon",t.img="img",t.input="input"}(e||(e={}));class o extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.keys(e)}attributeChangedCallback(t,e,s){this[t]=s,this.render()}connectedCallback(){this.render(),this.addEventListeners()}addEventListeners(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".container-img-icon");e&&e.addEventListener("click",(()=>{this.dispatchEvent(new CustomEvent("toggle-user-container",{bubbles:!0,composed:!0}))}))}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n                <link rel="stylesheet" href="../src/components/navBar/navBar.css">\n                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">\n                <section class='container'>\n                    <button class='container-img-icon' aria-label="Toggle User Container">\n                        <i class="fa-solid fa-bars"></i>\n                    </button>\n    \n                    <div class='container-img-logo'>\n                        <img src="${this.img||"No Image"}" alt="BookLoop Logo">\n                    </div>\n    \n                    <div class='container-search'>\n                        <i class="fa-solid fa-magnifying-glass" style="color: #322316;"></i>\n                        <input type="text" placeholder="${this.input||"Search"}">\n                    </div>\n                </section>\n            `)}}customElements.define("nav-bar",o),function(t){t.home="home",t.clubs="clubs",t.discover="discover",t.help="help",t.setting="setting"}(s||(s={}));class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.keys(s)}attributeChangedCallback(t,e,s){this[t]=s,this.render()}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="../src/components/userMenu/userMenu.css">\n            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">\n            <section class='container'>\n\n                <div class='action-user-element'>    \n                    <div class='home-element'>\n                        <a href="${this.home||"No Link"}"><i class="fa-solid fa-house" style="color: #ffc320;"></i>Home</a>\n                    </div>\n                    <div class='clubs-element'>\n                        <a href="${this.clubs||"No Link"}"><i class="fa-solid fa-user" style="color: #6471c7;"></i>Clubs</a>\n                    </div>\n                    <div class='discover-element'>\n                        <a href="${this.discover||"No Link"}"><i class="fa-solid fa-compass" style="color: #c2be4d;"></i>Discover</a>\n                    </div>\n                </div>\n\n                <div class='setting-user-element'>\n                    <div class='help-element'>\n                        <a href="${this.help||"No Link"}"><i class="fa-solid fa-circle-question" style="color: #322316;"></i>Help & Support</a>\n                    </div>\n                    <div class='setting-element'>\n                        <a href="${this.setting||"No Link"}"><i class="fa-solid fa-gear" style="color: #332231;"></i>Settings & Privacy</a>\n                    </div>\n                </div>  \n\n            </section>\n            `)}}customElements.define("user-menu",a),function(t){t.userpic="userpic",t.text="text",t.buttontext="buttontext",t.buttonimages="buttonimages",t.inputtext="inputtext",t.inputimage="inputimage",t.club="club",t.post="post"}(n||(n={}));class r extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.keys(n)}attributeChangedCallback(t,e,s){this[t]=s,this.render()}connectedCallback(){this.render(),this.addFileInputListener(),this.addButtonListeners(),this.setDefaultButton(),this.addFloatingButtonListener(),this.handleResize(),window.addEventListener("resize",(()=>this.handleResize()))}handleResize(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".container");window.innerWidth>500?null==e||e.classList.remove("hidden"):null==e||e.classList.add("hidden")}addButtonListeners(){var t,e,s,n;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".button-text"),o=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".button-images"),a=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelector(".input-wrapper-inputtext"),r=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector(".input-wrapper-inputimage");null==i||i.addEventListener("click",(()=>{null==a||a.classList.remove("hidden"),null==r||r.classList.add("hidden"),this.updateButtonStyles(i,o)})),null==o||o.addEventListener("click",(()=>{null==a||a.classList.add("hidden"),null==r||r.classList.remove("hidden"),this.updateButtonStyles(o,i)}))}updateButtonStyles(t,e){t&&t.classList.add("selected"),e&&e.classList.remove("selected")}setDefaultButton(){var t,e,s;const n=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".button-text"),i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".input-wrapper-inputtext"),o=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelector(".input-wrapper-inputimage");n&&(this.updateButtonStyles(n,null),null==i||i.classList.remove("hidden"),null==o||o.classList.add("hidden"))}addFileInputListener(){var t,e;const s=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".file-input"),n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".file-placeholder");s&&n&&s.addEventListener("change",(t=>{const e=t.target;e.files&&e.files.length>0?n.textContent=e.files[0].name:n.textContent=this.inputimage||"No input"}))}addFloatingButtonListener(){var t,e;const s=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".floating-button"),n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".container");null==s||s.addEventListener("click",(()=>{n&&n.classList.toggle("hidden")}))}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="../src/components/newPost/newPost.css">\n            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">\n            <form class='container'>\n                <div class='container-userpic'>\n                    <a href="#">\n                        <img src="${this.userpic||"No User Pic"}" alt="User Picture">\n                    </a>\n                    <h2>${this.text||"No Text"}</h2>\n                </div>\n                <div class='container-button'>\n                    <button type="button" class="button-text">${this.buttontext||"No Button Text"}</button>\n                    <button type="button" class="button-images">${this.buttonimages||"No Button Images"}</button>\n                </div>\n                <div class='container-inputs'>\n                    <div class="input-wrapper-inputtext">\n                        <i class="fa-solid fa-message" style="color: #999;"></i>\n                        <input type="text" placeholder="${this.inputtext||"No input"}" name="textInput">\n                    </div>\n                    <label class="input-wrapper-inputimage hidden">\n                        <i class="fa-solid fa-cloud-arrow-up" style="color: #999;"></i>\n                        <span class="file-placeholder">${this.inputimage||"No input"}</span>\n                        <input type="file" class="file-input" name="imageInput">\n                    </label>\n                </div>\n                <div class='container-buttons-post'>\n                    <button type="button">${this.club||"No Club"}<i class="fa-solid fa-users" style="color: #F9F5F3;"></i></button>\n                    <button type="submit">${this.post||"No Post"}</button>\n                </div>\n            </form>\n            <div class="floating-button">\n                <i class="fa-solid fa-message" style="color: #999;"></i>\n            </div>\n            `)}}customElements.define("new-post",r);const l=[{uid:0,background:"../src/assets/user/background/mauricio-santos-N1gFsYf9AI0-unsplash.jpg",userpic:"../src/assets/user/pics/dwayne-joe-LTY3S3mFHGY-unsplash.jpg",name:"Mara Volkov",at:"@MaraVolkov"}];class c extends HTMLElement{constructor(){super(),this.user=[],this.currentUserPic="",this.isUserContainerVisible=!0,this.attachShadow({mode:"open"}),this.currentUserPic=l[0].userpic,l.forEach((t=>{const e=this.ownerDocument.createElement("user-info");e.setAttribute("background",t.background),e.setAttribute("userpic",t.userpic),e.setAttribute("name",t.name),e.setAttribute("at",t.at),this.user.push(e)}))}connectedCallback(){this.render(),this.addEventListener("toggle-user-container",(()=>this.toggleUserContainer()))}toggleUserContainer(){var t,e,s;this.isUserContainerVisible=!this.isUserContainerVisible;const n=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".user-container"),i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".post-container"),o=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelector(".container");n&&i&&o&&(n.classList.toggle("hidden",!this.isUserContainerVisible),this.isUserContainerVisible?(i.classList.remove("expanded"),o.classList.remove("full-width")):(i.classList.add("expanded"),o.classList.add("full-width")))}render(){if(this.shadowRoot){const t=this.ownerDocument.createElement("nav-bar");t.setAttribute("icon","../src/assets/logos/big_logo.png"),t.setAttribute("img","../src/assets/logos/medium_logo.png"),t.setAttribute("input","Search");const e=this.ownerDocument.createElement("section");e.className="container";const s=this.ownerDocument.createElement("section");s.className="user-container",this.user.forEach((t=>{s.appendChild(t)}));const n=this.ownerDocument.createElement("user-menu");n.setAttribute("home","#"),n.setAttribute("clubs","#"),n.setAttribute("discover","#"),n.setAttribute("help","#"),n.setAttribute("setting","#"),s.appendChild(n),e.appendChild(s);const i=this.ownerDocument.createElement("section");i.className="post-container";const o=this.ownerDocument.createElement("new-post");o.setAttribute("userpic",this.currentUserPic),o.setAttribute("text","Create new post"),o.setAttribute("buttontext","Text"),o.setAttribute("buttonimages","Images"),o.setAttribute("inputtext","Share something..."),o.setAttribute("inputimage","Drag and drop or upload media"),o.setAttribute("club","Select a Club"),o.setAttribute("post","Post"),i.appendChild(o),e.appendChild(i),this.shadowRoot.innerHTML='\n            <link rel="stylesheet" href="../src/screens/main/main.css">\n            ',this.shadowRoot.appendChild(t),this.shadowRoot.appendChild(e)}}}customElements.define("main-page",c);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML="\n            <main-page></main-page>\n            ")}}customElements.define("app-container",d)})();