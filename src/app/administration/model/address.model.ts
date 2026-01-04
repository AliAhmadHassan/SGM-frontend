export class Address {
    id: number
    publicPlace: string;
    neighborhood: string;
    complement: string;
    cep: string;
    city: { id: null, text: '' };
    uf: { id: null, text: '' };
    number: string;
    reference: string;
    description: string;

    constructor() {
        this.id = null;
        this.publicPlace = '';
        this.neighborhood = '';
        this.complement = '';
        this.cep = '';
        this.city = { id: null, text: '' };
        this.uf = { id: null, text: '' };
        this.number = '';
        this.reference = '';
        this.description = '';
    }
}

export class AddressRequest {
    publicPlace: string;
    neighborhood: string;
    complement: string;
    cep: string;
    cityId: number;
    ufId: number;
    number: string;
    reference: string;
    description: string;

    constructor() {
        this.publicPlace = '';
        this.neighborhood = '';
        this.complement = '';
        this.cep = '';
        this.cityId = null;
        this.ufId = null;
        this.number = '';
        this.reference = '';
        this.description = '';
    }
}
