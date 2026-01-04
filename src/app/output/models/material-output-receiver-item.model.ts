class MaterialOutputReceiverItem {
  materialCode: string;
  description: string;
  unity: string;
  disciplineId: number;
  disciplineText: string;
  amount: number;

  constructor() {
      this.materialCode = '';
      this.description = '';
      this.unity = '';
      this.disciplineId = null;
      this.disciplineText = '';
      this.amount = 0;
  }
}

export default MaterialOutputReceiverItem;
