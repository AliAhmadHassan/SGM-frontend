import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComboService } from 'src/app/shared/services/combo.service';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
// import { ApproveRmaService } from '../../services/with-invoice-and-with-order.service';
import { Router } from '@angular/router';
// import ApproveRma from '../../models/with-invoice-and-with-order.model';
// import ApproveRmaModel from '../../models/with-invoice-and-with-order-and-items.model';
import ColumnConfig from 'src/app/shared/models/column-config.model';
import ApproveRmaModel from '../../models/approve-rma.model';
import { ApproveRmaService } from '../../services/approve-rma.service';
import ApproveRma from '../../models/approve-rma.model';
import ApproveRmaAndItems from '../../models/approve-rma-and-items.model';
import Patch from 'src/app/shared/models/patch.model';

@Component({
  selector: 'app-approve-rma',
  templateUrl: './approve-rma.component.html',
  styleUrls: ['./approve-rma.component.scss']
})
export class ApproveRmaComponent implements OnInit {
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('detailsModal', { static: true }) detailsModal: ElementRef;

  public config;
  public branchOfficeDescriptionFilter: string = null;
  public rmaFilter: number = null;
  public dateBeginFilter: string = '';
  public dateFinishFilter: string = '';
  public approverFilter: any;
  public installationFilter: any;
  public receiverCodeFilter: any;
  public providerNameFilter: any;
  public statusFilter: any = 'Pendente Aprovação';
  public receiverNameFilter: string = '';
  public materialCodeFilter: string = '';
  public materialDescriptionFilter: string = '';
  public data: ApproveRmaAndItems;
  public statusList: any;
  public approverList: any;
  public installationList: any;
  public receiverCodeList: any;
  public materials: any;

  constructor(public service: ApproveRmaService,
    private modalService: NgbModal,
    private comboService: ComboService,
    private router: Router) {
    this.config = new GenericPageFluent()
      .setTitle('Aprovar RMA')
      .setTable(new GenericTableFluent()
        .addTableColumn('RMA', 'rmaId')
        .addTableColumn('Data Emissão', 'emissionDate', new ColumnConfig({ type: 'date' }))
        .addTableColumn('Status', 'status', new ColumnConfig({ type: 'status', width: '180px' }))
        .addTableColumn('Aprovador', 'approverUser')
        .addTableColumn('Instalação Origem', 'installation')
        .addTableColumn('Código Destinatário', 'receiverCode')
        .addTableColumn('Nome Destinatário', 'receiverName')
        .addLineAction('', 'fa-plus', 'btn-success', (data: ApproveRma) => this.openDetailsModal(data.rmaId.toString()), 'Detalhes')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchApproveRma(params, {
        rma: this.rmaFilter,
        initialDate: this.dateBeginFilter,
        finishDate: this.dateFinishFilter,
        status: this.statusFilter,
        user: this.approverFilter,
        installationSource: this.installationFilter,
        receiverCode: this.receiverCodeFilter,
        receiverName: this.receiverNameFilter,
        materialCode: this.materialCodeFilter,
        materialDescription: this.materialDescriptionFilter
      }))
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter');
  }

  ngOnInit() {

    this.comboService.fetchReceiverCode().subscribe(response => {
      this.receiverCodeList = response.data
    });
    this.comboService.fetchRmaStatus().subscribe(response => {
      this.statusList = response.data
    });
    this.comboService.fetchResponsible().subscribe(response => {
      this.approverList = response.data
    });
    this.comboService.fetchInstallation().subscribe(response => {
      this.installationList = response.data
    });
    this.comboService.fetchMaterialWithoutOrder('').subscribe(response => {
      this.materials = response.data;
    });
  }

  public clearFilters() {
    this.rmaFilter = null;
    this.dateBeginFilter = '';
    this.dateFinishFilter = '';
    this.statusFilter = '';
    this.dateBeginFilter = '';
    this.dateFinishFilter = '';
    this.receiverCodeFilter = '';
    this.receiverNameFilter = '';
    this.materialCodeFilter = '';
    this.materialDescriptionFilter = '';
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public openModal(): void {
    this.modalService.open(this.detailsModal, { size: 'xl', backdrop: 'static' })
  }

  public openDetailsModal(rmaId: string): void {
    this.service.fetchDetailsModal(rmaId).subscribe(response => this.data = response.data);
    this.openModal();
  }

  public printModal() {
    window.print()
  }

  public reloadPage() {
    window.location.reload();
  }

  public sendNewStatus(rmaId: string, approverId: number, newStatusId: number) {
    let patch: Patch[] =  [new Patch, new Patch];
    patch[0].value = newStatusId;
    patch[1].value = approverId;
    this.service.patchStatus(rmaId, patch).subscribe();
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

  public setMaterial(event) {
    if(event){
      this.materialCodeFilter = event.code;
    }
  }
}
