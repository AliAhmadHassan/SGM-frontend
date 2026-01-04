class WithInvoiceAndWithOrder {
    branchOfficeDescription: string;
    orderCode: number;
    providerName: string;
    cnpj: string;
    orderEmission: string;
    orderStatus: string;

    constructor() {
        this.branchOfficeDescription = '';
        this.orderCode = null;
        this.providerName = '';
        this.cnpj = '';
        this.orderEmission = '';
        this.orderStatus = '';
    }
}

export default WithInvoiceAndWithOrder;
