class BranchOffice {
    id: number;
    fantasyName: string;
    name: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;

    constructor() {
        this.id = null;
        this.fantasyName = '';
        this.name = '';
        this.street = '';
        this.number = '';
        this.complement = '';
        this.neighborhood = '';
        this.city = '';
        this.uf = '';
        this.cep = '';
    }
}

export default BranchOffice;
