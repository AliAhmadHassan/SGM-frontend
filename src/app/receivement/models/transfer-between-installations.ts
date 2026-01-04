class TransferBetweenInstallations {
  stm: string;
  transfer: string;
  emissionDate: string;
  status: string;
  requester: string;
  approver: string;
  installationSource: string;
  installationDestiny: string;

  constructor() {
    this.stm = '';
    this.transfer = '';
    this.emissionDate = '';
    this.status = '';
    this.requester = '';
    this.approver = '';
    this.installationSource = '';
    this.installationDestiny = '';
  }
}

export default TransferBetweenInstallations;
