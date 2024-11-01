class LogoutButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
               
                <button class="logout-button" id="logout-button">Log out</button>
            `;

            const button = this.shadowRoot.querySelector('#logout-button');
            button?.addEventListener('click', () => this.handleLogout());
        }
    }

    handleLogout() {
        //logOutUser(); 
    }
}

customElements.define('logout-button', LogoutButton);
export default LogoutButton;