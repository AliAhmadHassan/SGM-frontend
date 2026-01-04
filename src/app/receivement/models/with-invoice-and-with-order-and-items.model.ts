import OrderItem from './order-item.model';

class WithInvoiceAndWithOrderAndItems {
    orderItem: OrderItem[];
    branchOfficeDescription: string;
    orderCode: number;
    providerName: string;
    cnpj: string;
    orderEmission: string;
    orderStatus: string;

    constructor() {
        this.orderItem = [];
        this.branchOfficeDescription = '';
        this.orderCode = null;
        this.providerName = '';
        this.cnpj = '';
        this.orderEmission = '';
        this.orderStatus = '';
    }
}

export default WithInvoiceAndWithOrderAndItems;
