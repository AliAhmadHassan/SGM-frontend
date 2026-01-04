import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComboService } from 'src/app/shared/services/combo.service';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { WithInvoiceAndWithOrderService } from '../../services/with-invoice-and-with-order.service';
import { Router } from '@angular/router';
import WithInvoiceAndWithOrder from '../../models/with-invoice-and-with-order.model';
import WithInvoiceAndWithOrderAndItems from '../../models/with-invoice-and-with-order-and-items.model';
import ColumnConfig from 'src/app/shared/models/column-config.model';

@Component({
  selector: 'app-with-invoice-and-with-order',
  templateUrl: './with-invoice-and-with-order.component.html',
  styleUrls: ['./with-invoice-and-with-order.component.scss']
})
export class WithInvoiceAndWithOrderComponent implements OnInit {
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('detailsModal', { static: true }) detailsModal: ElementRef;

  public config;
  public branchOfficeDescriptionFilter: string = null;
  public orderCodeFilter: number = null;
  public providerNameFilter: string = '';
  public orderStatusFilter: string = null;
  public dateBeginFilter: string = '';
  public dateFinishFilter: string = '';
  public materialCodeFilter: string = '';
  public materialDescriptionFilter: string = '';
  public data: WithInvoiceAndWithOrderAndItems;
  public listBranchOffice: any;
  public listStatus: any;
  public materials: any;

  constructor(public service: WithInvoiceAndWithOrderService,
    private modalService: NgbModal,
    private comboService: ComboService,
    private router: Router) {
      this.comboService.fetchMaterialWithoutOrder('').subscribe(response => {
        this.materials = response.data;
      });
    this.config = new GenericPageFluent()
      .setTitle('Recebimento com Nota Fiscal e Pedido')
      .setTable(new GenericTableFluent()
        .addTableColumn('Filial', 'branchOfficeDescription')
        .addTableColumn('Pedido', 'orderCode')
        .addTableColumn('Fornecedor', ['providerName', 'cnpj'], new ColumnConfig({width: '32rem'}))
        .addTableColumn('Emissão de Pedido', 'orderEmission', new ColumnConfig({width: '8rem', type: 'date'}))
        .addTableColumn('Status', 'orderStatus', new ColumnConfig({type: 'status'}))
        .addLineAction('', 'fa-plus', 'btn-success', (data: WithInvoiceAndWithOrder) => this.openDetailsModal(data.orderCode.toString()), 'Detalhes')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchWithInvoiceAndWithOrder(params, {
        branchOffice: this.branchOfficeDescriptionFilter,
        order: this.orderCodeFilter,
        provider: this.providerNameFilter,
        status: this.orderStatusFilter,
        dateBegin: this.dateBeginFilter,
        dateFinish: this.dateFinishFilter,
        materialCode: this.materialCodeFilter,
        materialDescription: this.materialDescriptionFilter
      }))
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV({
        branchOffice: this.branchOfficeDescriptionFilter,
        order: this.orderCodeFilter,
        provider: this.providerNameFilter,
        status: this.orderStatusFilter,
        dateBegin: this.dateBeginFilter,
        dateFinish: this.dateFinishFilter,
        materialCode: this.materialCodeFilter,
        materialDescription: this.materialDescriptionFilter
      }), 'btn-export', 'fa-share-square');
  }

  ngOnInit() {
    this.comboService.fetchBranchOffice().subscribe(response => {
      this.listBranchOffice = response.data
    });
    this.comboService.fetchOrder().subscribe(response => {
      this.listStatus = response.data
    });
  }

  public clearFilters() {
    this.branchOfficeDescriptionFilter = null;
    this.orderCodeFilter = null;
    this.providerNameFilter = '';
    this.orderStatusFilter = null;
    this.dateBeginFilter = '';
    this.dateFinishFilter = '';
    this.materialCodeFilter = '';
    this.materialDescriptionFilter = '';
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public openModal(): void {
    this.modalService.open(this.detailsModal, { size: 'xl', backdrop: 'static' })
  }

  public openDetailsModal(orderCode: string): void {
    this.service.fetchDetailsModal(orderCode).subscribe(response => this.data = response.data);
    this.openModal();
  }

  public printModal() {
    window.print()
  }

  public changePage() {
    this.router.navigateByUrl('/recebimento/material-de-fornecedor-com-nota-fiscal-e-com-pedido/formulario', { state: { id: this.data.orderCode } });
    sessionStorage.setItem( 'lastFormId', this.data.orderCode.toString() );
  }

  public customSearchFn(event: any = '') {
    this.getMaterials(event.term);
  }

  public getMaterials(value = '') {
    this.materialCodeFilter = value;
    let filters = { code: value.toString() };
    this.comboService.fetchMaterialWithoutOrder(filters).subscribe(response => {
      this.materials = response.data;
    });
  }
}
