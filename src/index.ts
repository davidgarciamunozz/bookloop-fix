import * as components from './components/index';
import { addObserver, appState } from './store/index';
import { Screens } from './types/store';
import './screens/REGISTER/REGISTER';
import './screens/LOGIN/LOGIN';
import './screens/DASHBOARD/DASHBOARD';
import './screens/DISCOVERLANDING/DISCOVERLANDING';
import './screens/CLUBSLANDING/CLUBSLANDING';
import './screens/CLUBSMAIN/CLUBSMAIN';


class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			switch (appState.screen) {

				case Screens.REGISTER:
					const register = this.ownerDocument.createElement('app-register');
					this.shadowRoot.appendChild(register);
					break;

				case Screens.LOGIN:
					const login = this.ownerDocument.createElement('app-login');
					this.shadowRoot.appendChild(login);
					break;

				case Screens.DASHBOARD:
					const dashboard = this.ownerDocument.createElement('app-dashboard');
					this.shadowRoot.appendChild(dashboard);
					break;

				case Screens.DISCOVERLANDING:
					const discoverlanding = this.ownerDocument.createElement('app-discover-landing');
					this.shadowRoot.appendChild(discoverlanding);
					break;

				case Screens.CLUBSLANDING:
					const clubslanding = this.ownerDocument.createElement('app-clubs-landing');
					this.shadowRoot.appendChild(clubslanding);
					break;

				case Screens.CLUBSMAIN:
					const clubsmain = this.ownerDocument.createElement('app-clubs-main');
					this.shadowRoot.appendChild(clubsmain);
					break;

				default:
					break;
			}
			console.log('Current screen:', appState.screen);
		}
	}
}

customElements.define('app-container', AppContainer);