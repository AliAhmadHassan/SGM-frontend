import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent {
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;

  public config;
  public descriptionFilter = '';
  public codeFilter = '';
  public unitFilter = '';

  constructor(public service: MaterialService, private modalService: NgbModal) {
    this.config = new GenericPageFluent()
      .setTitle('Materiais')
      .setTable(new GenericTableFluent()
        .addTableColumn('Código', 'code')
        .addTableColumn('Descrição', 'description')
        .addTableColumn('Unidade', 'unit')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchMaterials(params, {
        code: this.codeFilter, description: this.descriptionFilter, unit: this.unitFilter
      }))
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV({
        code: this.codeFilter,
        description: this.descriptionFilter,
        unit: this.unitFilter
      }), 'btn-export', 'fa-share-square')
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' });
  }

  public clearFilters() {
    this.codeFilter = '';
    this.unitFilter = '';
    this.descriptionFilter = '';
  }
}
