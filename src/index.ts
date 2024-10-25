import * as components from './components/index';
import './screens/DASHBOARD/DASHBOARD';

class AppContainer extends HTMLElement {
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
            <main-page></main-page>
            `;
        }
    }
}

customElements.define('app-container', AppContainer);
