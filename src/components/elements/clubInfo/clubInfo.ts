export enum AttributeClubInfo {
    'clubpic' = 'clubpic',
    'name' = 'name',
    'members' = 'members',
};

 export class clubInfo extends HTMLElement {
    clubpic?: string;
    name?: string;
    members?: number;
    

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(AttributeClubInfo) as Array<AttributeClubInfo>;
    }

    attributeChangedCallback(propName: AttributeClubInfo, oldValue: string | undefined | number, newValue: string | undefined ) {
        switch (propName) {
            case AttributeClubInfo.clubpic:
                this.clubpic = newValue as string; 
                break;
            case AttributeClubInfo.name:
                this.name = newValue as string; 
                break;
            case AttributeClubInfo.members:
                this.members = newValue ? Number(newValue) : 0; 
                break;
        }
    }

    connectedCallback() {
        this.render();
     
    }

 

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/elements/clubInfo/clubInfo.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
                <section class="clubs--info">
                <img src="${this.clubpic}" alt="Club picture">
                <div class="clubs--info__text">
                    <h4>${this.name}</h4>
                    <p>${this.members} Club members</p>
                    </div>
                </section>
            `;
        }
    }
    
}

customElements.define('club-info', clubInfo);
export default clubInfo;
