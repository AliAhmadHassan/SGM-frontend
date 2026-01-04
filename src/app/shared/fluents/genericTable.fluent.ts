import ColumnConfig from '../models/column-config.model';

export class GenericTableFluent {
  public columns = [];
  public actions = [];

  constructor() { }

  addTableColumn(text: string, key: string | String[], config?: ColumnConfig, prop?: string ) {
    config = config || new ColumnConfig();
    this.columns.push({ text, key, config, prop });
    return this;
  }

  addLineAction(text: string, icon: string, btnClass: string, onClick: CallableFunction, title?: string) {
    this.actions.push({ text, icon, btnClass, onClick, title });
    return this;
  }
}
