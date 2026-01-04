class RmaAttendance {
  rmaId: number;
  emissionDate: string;
  status: string;
  installation: string;
  receiverCode: number;
  receiverName: string;
  requesterUser: string;

  constructor() {
    this.rmaId = null;
    this.emissionDate = '';
    this.status = '';
    this.installation = '';
    this.receiverCode = null;
    this.receiverName = '';
    this.requesterUser = '';
  }
}

export default RmaAttendance;
