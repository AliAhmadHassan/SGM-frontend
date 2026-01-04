class MaterialItemTemporaryCustody {
  materialCode: string;
  description: string;
  unity: string;
  amount: number;
  disciplineId: string

  constructor() {
      this.materialCode = '';
      this.description = '';
      this.unity = '';
      this.amount = 0;
      this.disciplineId = '';
  }
}

export default MaterialItemTemporaryCustody;
