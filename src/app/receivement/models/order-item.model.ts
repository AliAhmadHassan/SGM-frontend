class OrderItem {
    item: number;
    materialCode: string;
    providerProductCode: string;
    materialDescription: string;
    unity: string;
    quantity: number;
    unitaryCost: number;
    totalCost: number;
    amountReceived: number;
    pending: number;

    constructor() {
        this.item = null;
        this.materialCode = '';
        this.providerProductCode = '';
        this.materialDescription = '';
        this.unity = '';
        this.quantity = null;
        this.unitaryCost = null;
        this.totalCost = null;
        this.amountReceived = null;
        this.pending = null;
    }
}

export default OrderItem;
