import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
    'home' = 'home',
    'clubs' = 'clubs',
    'discover' = 'discover',
    'help' = 'help',
    'setting' = 'setting',
};

class UserMenu extends HTMLElement {
    home?: string;
    clubs?: string;
    discover?: string;
    help?: string;
    setting?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute) as Array<Attribute>;
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    // navegateToDiscover(){
    //     dispatch(navigate(Screens.DISCOVER));
    // }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/userMenu/userMenu.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <section class='container'>

                <div class='action-user-element'>    
                    <div class='home-element'>
                        <a href="${this.home || 'No Link'}"><i class="fa-solid fa-house" style="color: #ffc320;"></i>Home</a>
                    </div>
                    <div class='clubs-element'>
                        <a href="${this.clubs || 'No Link'}"><i class="fa-solid fa-user" style="color: #6471c7;"></i>Clubs</a>
                    </div>
                    <div class='discover-element'>
                        <a href="${this.discover || 'No Link'}"><i class="fa-solid fa-compass" style="color: #c2be4d;"></i>Discover</a>
                    </div>
                </div>

                <div class='setting-user-element'>
                    <div class='help-element'>
                        <a href="${this.help || 'No Link'}"><i class="fa-solid fa-circle-question" style="color: #322316;"></i>Help & Support</a>
                    </div>
                    <div class='setting-element'>
                        <a href="${this.setting || 'No Link'}"><i class="fa-solid fa-gear" style="color: #332231;"></i>Settings & Privacy</a>
                    </div>
                </div>  

            </section>
            `;
        }
    }
}

customElements.define('user-menu', UserMenu);
export default UserMenu;