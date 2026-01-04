import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { ProviderService } from '../../services/provider.service';
import { ComboService } from 'src/app/shared/services/combo.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;

  public config;
  public cnpjFilter = '';
  public companyNameFilter = '';
  public fantasyNameFilter = '';
  public streetFilter = '';
  public numberFilter = '';
  public neighborhoodFilter = '';
  public cepFilter = '';
  public cityFilter = null;
  public ufFilter = null;
  public listUf: any;
  public listCities: any;

  constructor(private permissionService: PermissionService,
    public providerService: ProviderService,
    private serviceCombo: ComboService,
    private modalService: NgbModal) {
    this.config = new GenericPageFluent()
      .setTitle('Fornecedores')
      .setTable(new GenericTableFluent()
        .addTableColumn('CNPJ', 'cnpj')
        .addTableColumn('Razão Social', 'companyName')
        .addTableColumn('Nome Fantasia', 'fantasyName')
        .addTableColumn('Telefone', 'telephone')
        .addTableColumn('Logradouro', 'street')
        .addTableColumn('Número', 'number')
        .addTableColumn('Bairro', 'neighborhood')
        .addTableColumn('CEP', 'cep')
        .addTableColumn('Cidade', 'city')
        .addTableColumn('Estado', 'uf')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.providerService.fetchProviders(params, {
        cnpj: this.cnpjFilter,
        companyName: this.companyNameFilter,
        fantasyName: this.fantasyNameFilter,
        telephone: this.telephoneFilter,
        street: this.streetFilter,
        number: this.numberFilter,
        neighborhood: this.neighborhoodFilter,
        cep: this.cepFilter,
        city: this.cityFilter,
        uf: this.ufFilter
      }))
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => providerService.downloadCSV({
        cnpj: this.cnpjFilter,
        companyName: this.companyNameFilter,
        fantasyName: this.fantasyNameFilter,
        telephone: this.telephoneFilter,
        street: this.streetFilter,
        number: this.numberFilter,
        neighborhood: this.neighborhoodFilter,
        cep: this.cepFilter,
        city: this.cityFilter,
        uf: this.ufFilter
      }), 'btn-export', 'fa-share-square');
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

  public clearFilters() {
    this.cnpjFilter = '';
    this.companyNameFilter = '';
    this.fantasyNameFilter = '';
    this.telephoneFilter = '';
    this.streetFilter = '';
    this.numberFilter = '';
    this.neighborhoodFilter = '';
    this.cepFilter = '';
    this.cityFilter = null;
    this.ufFilter = null;
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' });
  }

  public maskTel: string = '';
  public previousLength: number = 0;
  public telephoneFilter = '';
  public maskTelephone() {
    var telephone: string = this.telephoneFilter;
    if (telephone.length <= 10){
      this.maskTel = '(00) 0000-0000';
    }
    if (telephone.length == 10 && this.previousLength == 10) {
      this.maskTel = '(00) 0 0000-0000';
    }
    this.previousLength = telephone.length;
  }

}
