class InstallationRequest {
    code: number;
    name: string;
    // id: number;
    // code: string;
    description?: string;
    typeId: number;
    projectId: number;
    addressId: number;
    thirdMaterialPermission: boolean;
    address: string;
    city: string;
    uf: string;

    constructor() {
        this.code = null;
        this.name = '';
        // this.id = null;
        // this.code = '';
        this.description = '';
        this.typeId = null;
        this.projectId = null;
        this.addressId = null;
        this.thirdMaterialPermission = false;
        this.address = '';
        this.city = '';
        this.uf = '';
    }
}

export default InstallationRequest;
