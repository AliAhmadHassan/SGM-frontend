import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransferBetweenInstallationsService } from '../../services/transfer-between-installations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ComboService } from 'src/app/shared/services/combo.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import TransferBetweenInstallations from '../../models/transfer-between-installations';
import ColumnConfig from 'src/app/shared/models/column-config.model';

@Component({
  selector: 'app-transfer-between-installations',
  templateUrl: './transfer-between-installations.component.html',
  styleUrls: ['./transfer-between-installations.component.scss']
})
export class TransferBetweenInstallationsComponent implements OnInit {
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('detailsModal', { static: true }) detailsModal: ElementRef;

  public config;
  public stmFilter: string = null;
  public transferFilter: string = null;
  public initialDateFilter: string = '';
  public finishDateFilter: string = '';
  public requiredUserFilter: number = null;
  public aprroverUserFilter: number = null;
  public installationSourceFilter: number = null;
  public installationDestinyFilter: number = null;
  public materialCodeFilter: number = null;
  public materialDescriptionFilter: string = '';
  public data: TransferBetweenInstallations;

  public requesterList: any;
  public approverList: any;
  public installationList: any;
  public materialCodeList: any;
  public responsibles: any;

  constructor(public service: TransferBetweenInstallationsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private comboService: ComboService,
    private dialog: DialogService,
    private alertService: AlertService,
    private router: Router) {
    this.config = new GenericPageFluent()
      .setTitle('Recebimento por Transferência entre Instalações')
      .setTable(new GenericTableFluent()
        .addTableColumn('STM', 'stm')
        .addTableColumn('Transferência', 'transfer')
        .addTableColumn('Data de Emissão', 'emissionDate', new ColumnConfig({type: 'date'}))
        .addTableColumn('Status', 'status', new ColumnConfig({width: '14rem', type: 'status'}))
        .addTableColumn('Requisitante', 'requester')
        .addTableColumn('Aprovador', 'approver')
        .addTableColumn('Instalação de Origem', 'installationSource')
        .addTableColumn('Instalação de Destino', 'installationDestiny')
        .addLineAction('', 'fa-plus', 'btn-success', (data: TransferBetweenInstallations) => this.openDetailsModal(data.stm.toString()), 'Detalhes')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchTransferBetweenInstallations(params, {
        stm: this.stmFilter,
        transfer: this.transferFilter,
        initialDate: this.initialDateFilter,
        finishDate: this.finishDateFilter,
        requiredUser: this.requiredUserFilter,
        aprroverUser: this.aprroverUserFilter,
        installationSource: this.installationSourceFilter,
        installationDestiny: this.installationDestinyFilter,
        materialCode: this.materialCodeFilter,
        materialDescription: this.materialDescriptionFilter
      }))
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV({
        stm: this.stmFilter,
        transfer: this.transferFilter,
        initialDate: this.initialDateFilter,
        finishDate: this.finishDateFilter,
        requiredUser: this.requiredUserFilter,
        aprroverUser: this.aprroverUserFilter,
        installationSource: this.installationSourceFilter,
        installationDestiny: this.installationDestinyFilter,
        materialCode: this.materialCodeFilter,
        materialDescription: this.materialDescriptionFilter
      }), 'btn-export', 'fa-share-square');
  }

  ngOnInit() {
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data
    });
    this.comboService.fetchInstallation().subscribe( x => this.installationList = x.data);
  }

  public clearFilters() {
    this.stmFilter = null;
    this.transferFilter = '';
    this.initialDateFilter = '';
    this.finishDateFilter = '';
    this.requiredUserFilter = null;
    this.aprroverUserFilter = null;
    this.installationSourceFilter = null;
    this.installationDestinyFilter = null;
    this.materialCodeFilter = null;
    this.materialDescriptionFilter = '';
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public openModal(): void {
    this.modalService.open(this.detailsModal, { size: 'xl', backdrop: 'static' })
  }

  public openDetailsModal(tranfer: string): void {
    this.service.fetchDetailsModal(tranfer).subscribe(response => this.data = response.data);
    this.openModal();
  }

  public changePage() {
    this.router.navigateByUrl('/recebimento/material-por-transferência-entre-instalações/formulario', { state: { id: this.data.stm } });
    sessionStorage.setItem( 'lastFormId', this.data.stm.toString() );
  }

}
