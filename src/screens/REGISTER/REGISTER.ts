import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { registerUser } from '../../utils/firebase';

interface Credentials {
    email: string;
    password: string;
    name: string;
    userName: string;
}

const credentials: Credentials = {
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

    changeEmail = (e: any) => {
        credentials.email = e.target.value;
    }

    changePassword = (e: any) => {
        credentials.password = e.target.value;
    }

    changeName = (e: any) => {
        credentials.name = e.target.value;
    }

    changeUserName = (e: any) => {
        let userName = e.target.value;
        // If the username does not start with @, we add it
        if (!userName.startsWith('@')) {
            userName = '@' + userName;
        }
        // Replace spaces with underscores
        userName = userName.replace(/\s+/g, '_');
        // We convert to lowercase
        userName = userName.toLowerCase();
        credentials.userName = userName;
    }

    submitForm = async () => {
        if (!credentials.email || !credentials.password || !credentials.name || !credentials.userName) {
            alert('All fields are required');
            return;
        }

        const resp = await registerUser(credentials);
        resp ? dispatch(navigate(Screens.LOGIN)) : alert('Error, try again');
    }

    async render() {
        if (this.shadowRoot) {
            const title = this.ownerDocument.createElement('h1');
            title.innerText = 'Register';
            this.shadowRoot.appendChild(title);

            const form = this.ownerDocument.createElement('form');
            form.onsubmit = (e) => {
                e.preventDefault();
                this.submitForm();
            };

            const pEmail = this.ownerDocument.createElement('input');
            pEmail.placeholder = 'Enter your email';
            pEmail.type = 'email';
            pEmail.required = true;
            pEmail.addEventListener('change', this.changeEmail);
            form.appendChild(pEmail);

            const pPassword = this.ownerDocument.createElement('input');
            pPassword.placeholder = 'Enter your password';
            pPassword.type = 'password';
            pPassword.required = true;
            pPassword.addEventListener('change', this.changePassword);
            form.appendChild(pPassword);

            const pName = this.ownerDocument.createElement('input');
            pName.placeholder = 'Write your name';
            pName.required = true;
            pName.addEventListener('change', this.changeName);
            form.appendChild(pName);

            const puserName = this.ownerDocument.createElement('input');
            puserName.placeholder = 'Write your user name';
            puserName.required = true;
            puserName.addEventListener('change', this.changeUserName);
            form.appendChild(puserName);

            const save = this.ownerDocument.createElement('button');
            save.innerText = 'Register';
            save.type = 'submit';
            form.appendChild(save);

            this.shadowRoot.appendChild(form);
        }
    }
}

customElements.define('app-register', Register);
export default Register;