class InstallationResponse {
    code: number;
    name: string;
    // id: number;
    // code: string;
    description?: string;
    type: string;
    project: string;
    address: string;
    thirdMaterialPermission: string;

    constructor() {
        this.code = null;
        this.name = '';
        // this.id = null;
        // this.code = '';
        this.description = '';
        this.type = '';
        this.project = '';
        this.address = '';
        this.thirdMaterialPermission = '';
    }
}

export default InstallationResponse;
