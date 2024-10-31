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

	changeAge(e: any) {
		credentials.userName = e.target.value;
	}

	async submitForm() {
		const resp = await registerUser(credentials);
		resp ? dispatch(navigate(Screens.LOGIN)) : alert('Could not create user');
	}

	async render() {
		if (this.shadowRoot) {

			const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../src/screens/REGISTER/REGISTER.css';
            this.shadowRoot.appendChild(link);


			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Register';
			this.shadowRoot.appendChild(title);

			const pEmail = this.ownerDocument.createElement('input');
			pEmail.placeholder = 'Email';
			pEmail.required = true;
			pEmail.addEventListener('change', this.changeEmail);
			this.shadowRoot.appendChild(pEmail);

			const pPassword = this.ownerDocument.createElement('input');
			pPassword.placeholder = 'Password';
			pPassword.type = 'password';
			pPassword.required = true;
			pPassword.addEventListener('change', this.changePassword);
			this.shadowRoot.appendChild(pPassword);

			const pName = this.ownerDocument.createElement('input');
			pName.placeholder = 'Full name';
			pName.required = true;
			pName.addEventListener('change', this.changeName);
			this.shadowRoot.appendChild(pName);

			const pUserName = this.ownerDocument.createElement('input');
			pUserName.placeholder = 'User name';
			pUserName.required = true;
			pUserName.addEventListener('change', this.changeAge);
			this.shadowRoot.appendChild(pUserName);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Register';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(save);
		}
	}
}

customElements.define('app-register', Register);
export default Register;