import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { loginUser } from '../../utils/firebase';

const credentials = {
	email: '',
	password: '',
};

class Login extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	changeEmail(e: any) {
		credentials.email = e.target.value;
	}

	changePassword(e: any) {
		credentials.password = e.target.value;
	}

	submitForm() {
		loginUser(credentials.email, credentials.password);
	}

	async render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/screens/LOGIN/LOGIN.css">
            `;

			const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../src/screens/LOGIN/LOGIN.css';
            this.shadowRoot.appendChild(link);

			const container = document.createElement('div');
			container.className = 'form-container';

			const title = this.ownerDocument.createElement('h1');
			title.className = 'form-title';
			title.innerText = 'Login';
			this.shadowRoot.appendChild(title);

			const pEmail = this.ownerDocument.createElement('input');
			pEmail.className = 'form-input';
			pEmail.placeholder = 'Email';
			pEmail.required = true;
			pEmail.addEventListener('change', this.changeEmail);
			this.shadowRoot.appendChild(pEmail);

			const pPassword = this.ownerDocument.createElement('input');
			pPassword.className = 'form-input';
			pPassword.type = 'password';
			pPassword.placeholder = 'Password';
			pPassword.required = true;
			pPassword.addEventListener('change', this.changePassword);
			this.shadowRoot.appendChild(pPassword);

			const save = this.ownerDocument.createElement('button');
			save.className = 'form-button';
			save.innerText = 'Login';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(save);

			this.shadowRoot.appendChild(container);
		}
	}
}

customElements.define('app-login', Login);
export default Login;