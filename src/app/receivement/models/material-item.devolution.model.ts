class MaterialItemDevolution {
    materialCode: string;
    description: string;
    unity: string;
    amount: number;
    materialStatusId: number;
    devolutionReasonId: number;
    additionalController: string;

    constructor() {
        this.materialCode = '';
        this.description = '';
        this.unity = '';
        this.amount = 0;
        this.materialStatusId = null;
        this.devolutionReasonId = null;
        this.additionalController = '';
    }
}

export default MaterialItemDevolution;
