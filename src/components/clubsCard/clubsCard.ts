import '../../components/elements/clubInfo/clubInfo';

export enum AttributeClubsCard {
    'clubpic' = 'clubpic',
    'name' = 'name',
    'members' = 'members',
}

class ClubsCard extends HTMLElement {
    clubpic?: string;
    name?: string;
    members?: number;
    isSaved: boolean = false; 
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(AttributeClubsCard) as Array<AttributeClubsCard>;
    }

    attributeChangedCallback(propName: AttributeClubsCard, oldValue: string | undefined | number, newValue: string | undefined) {
        switch (propName) {
            case AttributeClubsCard.clubpic:
                this.clubpic = newValue as string;
                break;
            case AttributeClubsCard.name:
                this.name = newValue as string;
                break;
            case AttributeClubsCard.members:
                this.members = newValue ? Number(newValue) : 0;
                break;
        }
    }

    connectedCallback() {
        this.render();

        // Agregar el evento de clic para el botón de guardado del componente club-info
        const saveButton = this.shadowRoot?.querySelector('club-info .save-icon');
        if (saveButton) {
            saveButton.addEventListener('click', this.toggleSave.bind(this));
        }
    }

    toggleSave() {
        this.isSaved = !this.isSaved;
        const saveIcon = this.shadowRoot?.querySelector('club-info .save-icon i');
        if (saveIcon) {
            if (this.isSaved) {
                saveIcon.classList.add('saved'); 
            } else {
                saveIcon.classList.remove('saved'); 
            }
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/clubsCard/clubsCard.css">
                                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

                <section class="club-card">
                    <club-info
                        clubpic="${this.clubpic}"
                        name="${this.name}"
                        members="${this.members}"
                    ></club-info>
                    <button class="save-icon">
                        <i class="fa-regular fa-bookmark"></i></button>
                </section>
                
            `;
        }
    }
}

customElements.define('clubs-card', ClubsCard);
export default ClubsCard;
