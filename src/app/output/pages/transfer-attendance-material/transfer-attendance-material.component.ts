import { TransferAttendanceMaterialService } from './../../services/transfer-attendance-material.service';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { Router } from '@angular/router';
import { ComboService } from 'src/app/shared/services/combo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import ColumnConfig from 'src/app/shared/models/column-config.model';
import TransferAttendanceMaterial from '../../models/transfer-attendance-material.model';


@Component({
  selector: 'app-transfer-attendance-material',
  templateUrl: './transfer-attendance-material.component.html',
  styleUrls: ['./transfer-attendance-material.component.scss']
})
export class TransferAttendanceMaterialComponent implements OnInit {
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('detailsModal', { static: true }) detailsModal: ElementRef;

  config:any;
  stmFilter:string;
  initialDateFilter: string = '';
  finishDateFilter: string = '';
  statusFilter: string = '';
  requiredUserFilter: string = '';
  withdrawUserFilter: string = '';
  installationSourceFilter: string = '';
  installationDestinyFilter: string = '';
  materialCodeFilter: string = '';
  materialDescriptionFilter: string = '';
  listStatus: any;
  listRequiredUser: any;
  listWithdrawUser: any;
  listInstallationSource: any;
  listInstallationDestiny: any;
  listMaterialCode: any;
  data: TransferAttendanceMaterial;


  constructor(public service: TransferAttendanceMaterialService,
    private modalService: NgbModal,
    private serviceCombo: ComboService,
    private router: Router) {
      this.config = new GenericPageFluent()
      .setTitle('Atendimento de Solicitação de Transferência')
      .setTable(new GenericTableFluent()
        .addTableColumn('SMT', 'stm_Id')
        .addTableColumn('Data Emissão', 'stmDtCriacao', new ColumnConfig({width: '8rem', type: 'date'}))
        .addTableColumn('Status', 'stsDescricao', new ColumnConfig({type: 'status'}))
        .addTableColumn('Requisitante', 'usuNomeSolicitante')
        .addTableColumn('Aprovador', 'usuNomeAprovador')
        .addTableColumn('Instalação Origem', 'insNomeOrigem')
        .addTableColumn('Instalação Destino', 'insNomeDestino')
          .addLineAction('', 'fa-plus', 'btn-success', (data: TransferAttendanceMaterial) => this.openDetailsModal(data.stm_Id), 'Detalhes')
        )
        .setItemsPerPage(20)
        .setRequestService((params) => this.service.fetchTransferAttendanceMaterial(params, {
          sTM: this.stmFilter,
          initialDate: this.initialDateFilter,
          finishDate: this.finishDateFilter,
          requiredUser: this.requiredUserFilter,
          withdrawUser: this.withdrawUserFilter,
          installationSource: this.installationSourceFilter,
          installationDestiny: this.installationDestinyFilter,
          materialCode: this.materialCodeFilter,
          materialDescription: this.materialDescriptionFilter,
          status: this.statusFilter,
          transfer: null
        }))
        .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
        .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
        .addFooterButton('Exportar', () => this.service.downloadCSV({
          sTM: this.stmFilter,
          initialDate: this.initialDateFilter,
          finishDate: this.finishDateFilter,
          requiredUser: this.requiredUserFilter,
          withdrawUser: this.withdrawUserFilter,
          installationSource: this.installationSourceFilter,
          installationDestiny: this.installationDestinyFilter,
          materialCode: this.materialCodeFilter,
          materialDescription: this.materialDescriptionFilter,
          status: this.statusFilter,
          transfer: null
        }), 'btn-export', 'fa-share-square');
    }

  ngOnInit() {


      this.serviceCombo.fetchOrder().subscribe(response => {
        this.listStatus = response.data
      });

      this.serviceCombo.fetchResponsible().subscribe(response => {
        this.listRequiredUser = response.data;
        this.listWithdrawUser = response.data;
      });
      this.serviceCombo.fetchInstallation().subscribe(response => {
        this.listInstallationSource = response.data;
        this.listInstallationDestiny = response.data;
      });
  }

  public clearFilters() {
    this.stmFilter = '';
    this.initialDateFilter = '';
    this.finishDateFilter = '';
    this.statusFilter = '';
    this.requiredUserFilter = '';
    this.withdrawUserFilter = '';
    this.installationSourceFilter = '';
    this.installationDestinyFilter = '';
    this.materialCodeFilter = '';
    this.materialDescriptionFilter = '';
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public openModal(): void {
    this.modalService.open(this.detailsModal, { size: 'xl', backdrop: 'static' })
  }

  public openDetailsModal(stm: number): void {
    this.service.fetchDetailsModal(stm).subscribe(
      response =>{
        this.data = response.data
      }
      );
    this.openModal();
  }

  public cancelAction(){

  }

  public changePage(){

  }
}
