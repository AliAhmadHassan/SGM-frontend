class ApproveRma {
  rmaId: number;
  emissionDate: string;
  status: string;
  approverUser: string;
  installation: string;
  receiverCode: number;
  receiverName: string;

  constructor() {
    this.rmaId = null;
    this.emissionDate = '';
    this.status = '';
    this.approverUser = '';
    this.installation = '';
    this.receiverCode = null;
    this.receiverName = '';
  }
}

export default ApproveRma;
