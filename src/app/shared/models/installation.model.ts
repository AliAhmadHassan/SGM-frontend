class Installation {
    code: number;
    name: string;
    description: string;
    type: { id: null, text: '' };
    project: { id: null, text: '' };
    address: { id: null, text: '' };
    thirdMaterialPermission: boolean;

    constructor() {
        this.code = null;
        this.name = '';
        this.description = '';
        this.type = { id: null, text: '' };
        this.project = { id: null, text: '' };
        this.address = { id: null, text: '' };
        this.thirdMaterialPermission = false;
    }
}

export default Installation;
