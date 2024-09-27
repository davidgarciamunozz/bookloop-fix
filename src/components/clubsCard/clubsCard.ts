import '../../components/elements/clubInfo/clubInfo';
import { dataClubs } from '../../data/dataClubs';

export enum AttributeClubsCard {
    'cardtitle' = 'cardtitle',
    'buttontext' = 'buttontext',
    'cardcolor' = 'cardcolor',
    'buttoncolor' = 'buttoncolor',
}

class ClubsCard extends HTMLElement {
    clubs = dataClubs;
    cardtitle: string = '';
    buttontext: string = '';
    cardcolor: string = 'black';
    buttoncolor: string = 'gray';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['cardtitle', 'buttontext', 'cardcolor', 'buttoncolor'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (newValue) {
            if (name === 'cardtitle') {
                this.cardtitle = newValue;
            } else if (name === 'buttontext') {
                this.buttontext = newValue;
            } else if (name === 'cardcolor') {
                this.cardcolor = newValue;
            } else if (name === 'buttoncolor') {
                this.buttoncolor = newValue;
            }
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/clubsCard/clubsCard.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

                <section>
                    <div class="card">
                        <h3 style="color: ${this.cardcolor};">${this.cardtitle || 'Default Title'}</h3>
                    </div>
                    <div class="club-list">
                        ${this.clubs.map(club => `
                            <div class="club-info-container">
                                <club-info
                                    clubpic="${club.clubpic}"
                                    name="${club.name}"
                                    members="${club.members}"
                                ></club-info>
                                <i class="fas fa-bookmark bookmark-icon" data-club-name="${club.name}" aria-hidden="true"></i>
                            </div>
                        `).join('')}
                        <button style="background-color: ${this.buttoncolor};">${this.buttontext || 'Default Button'}</button>
                    </div>
                </section>
            `;
            this.shadowRoot.querySelectorAll('.bookmark-icon').forEach(icon => {
                icon.addEventListener('click', () => {
                    icon.classList.toggle('filled');
                });
            });
        }
    }
}

customElements.define('clubs-card', ClubsCard);
export default ClubsCard;
