class MaterialItem {
  materialCode: string;
  description: string;
  unity: string;
  amountReceived: number;
  disciplineId: string

  constructor() {
      this.materialCode = '';
      this.description = '';
      this.unity = '';
      this.amountReceived = 0;
      this.disciplineId = '';
  }
}

export default MaterialItem;
