import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, AddressRequest } from '../../model/address.model'
import { ComboService } from 'src/app/shared/services/combo.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('AddressModal', { static: true }) AddressModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;


  public config;
  public neighborhoodFilter: string = '';
  public complementFilter: string = '';
  public cepFilter: string = '';
  public numberFilter: string = '';
  public referenceFilter: string = '';
  public descriptionFilter: string = '';
  public publicPlaceFilter: string = '';
  public ufFilter: string = null;
  public cityFilter: string = null;
  public form: FormGroup;
  public publicPlace = this.fb.control(null, {
    validators: [Validators.maxLength(250)],
    updateOn: 'blur'
  });
  public neighborhood = this.fb.control(null, {
    validators: [Validators.maxLength(250)],
    updateOn: 'blur'
  });
  public complement = this.fb.control(null, {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public cep = this.fb.control(null, {
    validators: [Validators.maxLength(9), Validators.pattern("[0-9]*$")],
    updateOn: 'blur'
  });
  public cityId = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public ufId = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public number = this.fb.control(null, {
    validators: [Validators.maxLength(25)],
    updateOn: 'blur'
  });
  public reference = this.fb.control(null, {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public description = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(250)],
    updateOn: 'blur'
  });
  public listCities: any;
  public listUf: any;
  public edit: boolean = false;
  private id: number = null;

  constructor(public service: AddressService,
    private serviceCombo: ComboService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dialog: DialogService,
    private serviceAlert: AlertService) {
    this.config = new GenericPageFluent()
      .setTitle('Endereço Complementar da Instalação')
      .setTable(new GenericTableFluent()
        .addTableColumn('Logradouro', 'publicPlace')
        .addTableColumn('Descrição', 'description')
        .addTableColumn('Número', 'number')
        .addTableColumn('Bairro', 'neighborhood')
        .addTableColumn('Complemento', 'complement')
        .addTableColumn('Referência', 'reference')
        .addTableColumn('CEP', 'cep')
        .addTableColumn('Cidade', 'city', null, 'name')
        .addTableColumn('Estado', 'uf', null, 'name')
        .addLineAction('', 'fa-edit', 'btn-success', (data) => this.modalEdit(data), 'Editar')
        .addLineAction('', 'fa-trash-alt', 'btn-danger', (data) => this.delete(data), 'Excluir')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fecthAddress(params, {
        cep: this.cepFilter,
        publicPlace: this.publicPlaceFilter,
        description: this.descriptionFilter,
        number: this.numberFilter,
        neighborhood: this.neighborhoodFilter,
        complement: this.complementFilter,
        reference: this.referenceFilter,
        city: this.cityFilter,
        uf: this.ufFilter
      }))
      .addHeaderButton('Novo Endereço', () => this.newAddress(), 'btn-filter', 'fa-plus')
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV({
        cep: this.cepFilter,
        publicPlace: this.publicPlaceFilter,
        description: this.descriptionFilter,
        number: this.numberFilter,
        neighborhood: this.neighborhoodFilter,
        complement: this.complementFilter,
        reference: this.referenceFilter,
        city: this.cityFilter,
        uf: this.ufFilter
      }), 'btn-export', 'fa-share-square');

    this.form = this.fb.group({
      cep: this.cep,
      publicPlace: this.publicPlace,
      neighborhood: this.neighborhood,
      number: this.number,
      complement: this.complement,
      reference: this.reference,
      cityId: this.cityId,
      ufId: this.ufId,
      description: this.description
    });

  }

  ngOnInit(): void {
    this.serviceCombo.fetchUf().subscribe(response => {
      this.listUf = response.data
    });
  }

  public fillCityCombo(ufId) {
    this.cityFilter = null;
    this.form.controls.cityId.reset();
    if (ufId) {
      this.serviceCombo.fetchCities(ufId).subscribe(response => {
        this.listCities = response.data;
      });
    } else {
      this.listCities = [];
    }
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public openModal(): void {
    this.modalService.open(this.AddressModal, { size: 'xl', backdrop: 'static' })
  }

  public modalEdit(data: Address): void {
    this.edit = true;
    this.id = data.id;
    this.form.controls.cep.setValue(data.cep);
    this.form.controls.publicPlace.setValue(data.publicPlace);
    this.form.controls.neighborhood.setValue(data.neighborhood);
    this.form.controls.number.setValue(data.number);
    this.form.controls.complement.setValue(data.complement);
    this.form.controls.reference.setValue(data.reference);
    this.serviceCombo.fetchCities(data.uf.id).subscribe(response => {
      this.listCities = response.data;
    });
    this.form.controls.ufId.setValue(data.uf.id);
    this.form.controls.cityId.setValue(data.city.id);
    this.form.controls.description.setValue(data.description);
    this.form.controls.ufId.markAsDirty({ onlySelf: true });
    this.openModal();
  }

  public newAddress() {
    this.edit = false;
    this.openModal();
  }

  public delete(data: Address): void {
    this.dialog.confirm('Atenção', 'Deseja realmente excluir o registro? <br> Após a confirmação não será possível recuperar a informação', () => {
      this.service.deleteAddress(data.id).subscribe(() => {
        this.genericPage.getData();
      },
        error => {
          this.serviceAlert.error("Esse registro possui vínculos e não pode ser excluído", 3000);
        })
    });
  }

  public cancelAction() {
    this.dialog.confirm('Atenção', 'Deseja realmente cancelar a operação? <br> As informações serão perdidas e as modificações desconsideradas.',
      () => {
        this.genericPage.getData();
        this.form.reset();
      }, "NoEmoticon", "Sim",
      () => {
        this.openModal();
      }, "NoEmoticon", "Não")
  }

  public clearFilters() {
    this.publicPlaceFilter = '';
    this.neighborhoodFilter = '';
    this.complementFilter = '';
    this.cepFilter = '';
    this.cityFilter = null;
    this.ufFilter = null;
    this.numberFilter = '';
    this.referenceFilter = '';
    this.descriptionFilter = '';
    this.listCities = [];
  }

  public onSubmit() {
    if (!this.form.invalid) {
      const result = this.form.value;
      const request = new AddressRequest();

      request.cep = result.cep;
      request.publicPlace = result.publicPlace;
      request.neighborhood = result.neighborhood;
      request.number = result.number;
      request.complement = result.complement;
      request.reference = result.reference;
      request.cityId = result.cityId;
      request.ufId = result.ufId;
      request.description = result.description;
      if (this.edit) {
        this.service.changeAddress(request, this.id).subscribe(() => {
          this.returnToPage();
        });
      } else {
        this.service.registerAddress(request).subscribe(() => {
          this.returnToPage();
        });
      }

    } else {
      Object.keys(this.form.controls).forEach(key => {
        if ((this[key].value === null || this[key].value.length === 0) && this[key].hasError('required')) {
          this[key].markAsDirty();
        }
      });
    }
  }

  public returnToPage(): void {
    this.form.reset();
    this.genericPage.getData();
    this.modalService.dismissAll(true);
  }

}
