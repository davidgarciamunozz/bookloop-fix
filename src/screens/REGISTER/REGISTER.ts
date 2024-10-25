import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { registerUser } from '../../utils/firebase';

const credentials = {
	email: '',
	password: '',
	name: '',
	userName: '',
};

class Register extends HTMLElement {
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

	changeName(e: any) {
		credentials.name = e.target.value;
	}

	changeUserName(e: any) {
		credentials.userName = e.target.value;
	}

	async submitForm() {
		const resp = await registerUser(credentials);
		resp ? dispatch(navigate(Screens.LOGIN)) : alert('Error, try again');
	}

	async render() {
		if (this.shadowRoot) {
			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Register';
			this.shadowRoot.appendChild(title);

			const pEmail = this.ownerDocument.createElement('input');
			pEmail.placeholder = 'Enter your email';
			pEmail.addEventListener('change', this.changeEmail);
			this.shadowRoot.appendChild(pEmail);

			const pPrice = this.ownerDocument.createElement('input');
			pPrice.placeholder = 'Enter your password';
			pPrice.addEventListener('change', this.changePassword);
			this.shadowRoot.appendChild(pPrice);

			const pName = this.ownerDocument.createElement('input');
			pName.placeholder = 'Write your name';
			pName.addEventListener('change', this.changeName);
			this.shadowRoot.appendChild(pName);

			const puserName = this.ownerDocument.createElement('input');
			puserName.placeholder = 'Write your user name';
			puserName.addEventListener('change', this.changeUserName);
			this.shadowRoot.appendChild(puserName);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Register';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(save);
		}
	}
}

customElements.define('app-register', Register);
export default Register;