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

    validateUserName(userName: string): string {
        // Check if it starts with @
        if (!userName.startsWith('@')) {
            userName = '@' + userName;
        }

        // Verify that it only contains lowercase letters, numbers and allowed characters
        const validPattern = /^@[a-z0-9\.\+\-\_]+$/;
        if (!validPattern.test(userName)) {
            throw new Error('The username can only contain lowercase letters, numbers, and the characters. + - _');
        }

        return userName;
    }

    changeEmail(e: any) {
        const input = e.target as HTMLInputElement;
        credentials.email = input.value;
        input.classList.toggle('error', !input.value);
    }

    changePassword(e: any) {
        const input = e.target as HTMLInputElement;
        credentials.password = input.value;
        input.classList.toggle('error', !input.value);
    }

    changeName(e: any) {
        const input = e.target as HTMLInputElement;
        credentials.name = input.value;
        input.classList.toggle('error', !input.value);
    }

    changeUserName(e: any) {
        const input = e.target as HTMLInputElement;
        try {
            credentials.userName = this.validateUserName(input.value);
            input.classList.remove('error');
            input.value = credentials.userName; // Update the input with the @ if it was added
        } catch (error) {
            input.classList.add('error');
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }

    validateForm(): boolean {
        return (
            credentials.email !== '' &&
            credentials.password !== '' &&
            credentials.name !== '' &&
            credentials.userName !== ''
        );
    }

    async submitForm() {
        if (!this.validateForm()) {
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
            pEmail.addEventListener('input', this.changeEmail);
            form.appendChild(pEmail);

            const pPassword = this.ownerDocument.createElement('input');
            pPassword.placeholder = 'Enter your password';
            pPassword.type = 'password';
            pPassword.required = true;
            pPassword.addEventListener('input', this.changePassword);
            form.appendChild(pPassword);

            const pName = this.ownerDocument.createElement('input');
            pName.placeholder = 'Write your name';
            pName.required = true;
            pName.addEventListener('input', this.changeName);
            form.appendChild(pName);

            const puserName = this.ownerDocument.createElement('input');
            puserName.placeholder = 'Write your user name';
            puserName.required = true;
            puserName.addEventListener('input', this.changeUserName);
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