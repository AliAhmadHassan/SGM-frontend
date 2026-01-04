class Patch {
  value: number;
  path: string;
  op: string;

  constructor() {
    this.value = null;
    this.path = '';
    this.op = 'replace';
  }
}

export default Patch;
