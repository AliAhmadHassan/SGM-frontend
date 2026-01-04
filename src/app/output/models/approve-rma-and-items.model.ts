import MaterialRmaItem from './material-rma-item.model'

class ApproveRmaAndItems {

    materials: MaterialRmaItem[];
    rmaId: number;
    emissionDate: Date;//
    status: string;
    approverUser: string;
    installation: string;
    receiverCode: number;
    receiverName: string

  constructor() {
    this.materials =  [];
    this.rmaId =  0;
    this.emissionDate =  null;//
    this.status =  '';
    this.approverUser =  '';
    this.installation =  '';
    this.receiverCode =  null;
    this.receiverName =  ''
  }
}

export default ApproveRmaAndItems;
