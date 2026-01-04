class ColumnConfig {
  width?: string;
  type?: string;

  constructor(columnConfig?: ColumnConfig) {
      this.width = columnConfig != null ? columnConfig.width : 'auto';
      this.type = columnConfig != null ? columnConfig.type : 'string';
  }
}

export default ColumnConfig;
