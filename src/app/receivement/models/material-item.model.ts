class MaterialItem {
    materialCode: string;
    description: string;
    unity: string;
    receivementAmount: number;
    unityPrice: number;
    totalPrice: number;

    constructor() {
        this.materialCode = '';
        this.description = '';
        this.unity = '';
        this.receivementAmount = 0;
        this.unityPrice = 0;
        this.totalPrice = 0;
    }
}

export default MaterialItem;
