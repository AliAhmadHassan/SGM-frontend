import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { BranchOfficeService } from '../../services/branch-office.service';
import { ComboService } from 'src/app/shared/services/combo.service';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.scss']
})
export class BranchOfficeComponent implements OnInit {
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;

  public config;
  public codeFilter = null;
  public fantasyNameFilter = '';
  public nameFilter = '';
  public streetFilter = '';
  public numberFilter = '';
  public neighborhoodFilter = '';
  public cepFilter = '';
  public cityFilter = null;
  public ufFilter = null;

  public listUf: any;
  public listCities: any;
  public listPublicPlace: any;

  constructor(public service: BranchOfficeService,
    private modalService: NgbModal,
    private serviceCombo: ComboService) {
    this.config = new GenericPageFluent()
      .setTitle('Filiais')
      .setTable(new GenericTableFluent()
        .addTableColumn('Código', 'id')
        .addTableColumn('Nome Fantasia', 'fantasyName')
        .addTableColumn('Nome', 'name')
        .addTableColumn('Logradouro', 'street')
        .addTableColumn('Número', 'number')
        .addTableColumn('Bairro', 'neighborhood')
        .addTableColumn('CEP', 'cep')
        .addTableColumn('Cidade', 'city')
        .addTableColumn('Estado', 'uf')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchBranchOffice(params, {
        code: this.codeFilter,
        fantasyName: this.fantasyNameFilter,
        name: this.nameFilter,
        street: this.streetFilter,
        number: this.numberFilter,
        neighborhood: this.neighborhoodFilter,
        cep: this.cepFilter,
        uf: this.ufFilter,
        city: this.cityFilter
      }))
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV({
        code: this.codeFilter,
        fantasyName: this.fantasyNameFilter,
        name: this.nameFilter,
        street: this.streetFilter,
        number: this.numberFilter,
        neighborhood: this.neighborhoodFilter,
        cep: this.cepFilter,
        uf: this.ufFilter,
        city: this.cityFilter
      }), 'btn-export', 'fa-share-square');
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public clearFilters() {
    this.codeFilter = null;
    this.fantasyNameFilter = '';
    this.nameFilter = '';
    this.streetFilter = '';
    this.numberFilter = '';
    this.neighborhoodFilter = '';
    this.cepFilter = '';
    this.cityFilter = null;
    this.ufFilter = null;
  }

  ngOnInit() {
    this.serviceCombo.fetchUf().subscribe(response => {
      this.listUf = response.data
    });
  }

  public fillCityCombo(ufId) {
    this.serviceCombo.fetchCities(ufId).subscribe(response => {
      this.listCities = response.data;
    });
  }
}
