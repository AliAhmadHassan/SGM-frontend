class MaterialRmaItem {
  materialCode: number;
  description: string;
  unity: string;
  discipline: string;
  requested: number;

  constructor() {
    this.materialCode = null;
    this.description = '';
    this.unity = '';
    this.discipline = '';
    this.requested = null;
  }
}

export default MaterialRmaItem;
