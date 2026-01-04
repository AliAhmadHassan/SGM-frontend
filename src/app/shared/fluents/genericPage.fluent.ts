import { GenericTableFluent } from './genericTable.fluent';

export class GenericPageFluent {
    public title = '';
    public table = null;
    public footerButtons = [];
    public headerButtons = [];
    public itemsPerPage = 10;
    public requestService: any;

    constructor() { }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setTable(table: GenericTableFluent) {
        this.table = table;
        return this;
    }

    setItemsPerPage(itemsPerPage: number) {
        this.itemsPerPage = itemsPerPage;
        return this;
    }

    setRequestService(requestService) {
        this.requestService = requestService;
        return this;
    }

    addFooterButton(text, callback, type = 'btn-outline-primary', icon) {
        this.footerButtons.push({ text, callback, type, icon });
        return this;
    }

    addHeaderButton(text, callback, type = 'btn-outline-primary', icon) {
        this.headerButtons.push({ text, callback, type, icon });
        return this;
    }
}
