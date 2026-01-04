export default class Recipient {
    id: number
    description: string;
    address: string ;
    receiverTypeId: number;
    receiverTypeText: string; 

    constructor() {
        this.id = null;
        this.description = '';
        this.address = '';
        this.receiverTypeId = null;
        this.receiverTypeText = '';
    }
}