import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import ColumnConfig from 'src/app/shared/models/column-config.model';
import { RmaAttendanceService } from '../../services/rma-attendance.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import RmaAttendance from '../../models/rma-attendance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rma-attendance',
  templateUrl: './rma-attendance.component.html',
  styleUrls: ['./rma-attendance.component.scss']
})
export class RmaAttendanceComponent implements OnInit {

  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('detailsModal', { static: true }) detailsModal: ElementRef;

  filterForm: FormGroup;
  config: GenericPageFluent;

  // Filter
  rma = this.fb.control(null);
  initialDate = this.fb.control(null);
  finishDate = this.fb.control(null);
  status = this.fb.control(null);
  requisitante = this.fb.control(null);
  installationSource = this.fb.control(null);
  receiverCode = this.fb.control(null);
  materialCode = this.fb.control(null);
  description = this.fb.control(null);

  statusList;
  requisitanteList;
  installationList;
  receiverCodeList;

  dataDetailsModal;

  constructor(
    private rmaAttendanceService: RmaAttendanceService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private comboService: ComboService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      rma: this.rma,
      initialDate: this.initialDate,
      finishDate: this.finishDate,
      status: this.status,
      requisitante: this.requisitante,
      installationSource: this.installationSource,
      receiverCode: this.receiverCode,
      materialCode: this.materialCode,
      description: this.description,
    });

    this.config = new GenericPageFluent()
      .setTitle('Atendimento RMA')
      .setTable(new GenericTableFluent()
        .addTableColumn('RMA', 'rmaId')
        .addTableColumn('Data Emissão', 'emissionDate', new ColumnConfig({ type: 'date' }))
        .addTableColumn('Status', 'status', new ColumnConfig({ type: 'status', width: '12rem' }))
        .addTableColumn('Requisitante', 'approverUser')
        .addTableColumn('Instalação Origem', 'installation')
        .addTableColumn('Código Destinatário', 'receiverCode')
        .addTableColumn('Nome Destinatário', 'receiverName')
        .addLineAction('', 'fa-plus', 'btn-success', (data: RmaAttendance) => this.openDetailsModal(data.rmaId), 'Detalhes')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.rmaAttendanceService.fetchRmaAttendence(params, {
        rma: this.rma.value,
        initialDate: this.initialDate.value,
        finishDate: this.finishDate.value,
        status: this.status.value,
        requisitante: this.requisitante.value,
        installationSource: this.installationSource.value,
        receiverCode: this.receiverCode.value,
        materialCode: this.materialCode.value,
        description: this.description.value
      }))
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter');
  }

  ngOnInit() {
    this.comboService.fetchRmaAttendanceStatus().subscribe(response => {
      this.statusList = response.data
    });
    this.comboService.fetchResponsible().subscribe(response => {
      this.requisitanteList = response.data
    });
    this.comboService.fetchInstallation().subscribe(response => {
      this.installationList = response.data
    });
    this.comboService.fetchReceiverCode().subscribe(response => {
      this.receiverCodeList = response.data
    });
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public setInitialDate(date: string): void {
    if (date) {
      this.filterForm.get('initialDate').setValue(date);
    }
  }

  public setfinishDate(date: string): void {
    if (date) {
      this.filterForm.get('finishDate').setValue(date);
    }
  }

  public clearFilters() {
    this.filterForm.reset();
  }

  public openDetailsModal(rmaId: number): void {
    this.rmaAttendanceService.fetchDetailsModal(rmaId).subscribe(response => this.dataDetailsModal = response.data);
    this.openModal();
  }

  public openModal(): void {
    this.modalService.open(this.detailsModal, { size: 'xl', backdrop: 'static' })
  }

  public changePage() {
    this.router.navigateByUrl('/saida/material-atendimento-rma/formulario');
    // sessionStorage.setItem( 'lastFormId', this.data.stm.toString() );
  }

}
