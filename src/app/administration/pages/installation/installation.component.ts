import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstallationService } from '../../services/installation.service';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ComboService } from 'src/app/shared/services/combo.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import Installation from '../../model/installation.model';
import InstallationRequest from '../../model/installation-request.model';
import { __values } from 'tslib';
import { Combo } from '../../model/combo.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('installationModal', { static: true }) installationModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;

  public config;
  public codeFilter = null;

  public nameFilter: string = '';

  public descriptionFilter: string = '';
  public typeFilter: Combo = null;
  public projectFilter: Combo = null;
  public addressFilter: Combo = null;
  public thirdMaterialPermissionFilter = null;
  public form: FormGroup;
  public name = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(128)],
    updateOn: 'blur'
  });
  // public code = this.fb.control(null, {
  //   validators: [Validators.required, Validators.maxLength(100)],
  //   updateOn: 'blur'
  // });
  public description = this.fb.control(null, {
    validators: [Validators.maxLength(256)],
    updateOn: 'blur'
  });
  public type = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public project = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public address = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public thirdMaterialPermission = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public listInstallationType: any;
  public listProject: any;
  public listAddress: any;
  public edit: boolean = false;
  private id: number = null;

  constructor(public service: InstallationService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private serviceCombo: ComboService,
    private dialog: DialogService,
    private serviceAlert: AlertService) {
    this.config = new GenericPageFluent()
      .setTitle('Instalações')
      .setTable(new GenericTableFluent()
        .addTableColumn('Código', 'code')

        .addTableColumn('Nome', 'name')

        .addTableColumn('Descrição', 'description')
        .addTableColumn('Tipo', 'type')
        .addTableColumn('Projeto', 'project')
        .addTableColumn('Endereço Complementar', 'address')
        // .addTableColumn('Tipo de Material', 'thirdMaterialPermission')
        .addTableColumn('Perm. Mat. de Terceiros', 'thirdMaterialPermission')
        .addLineAction('', 'fa-edit', 'btn-success', (data) => this.modalEdit(data), 'Editar')
        .addLineAction('', 'fa-trash-alt', 'btn-danger', (data) => this.delete(data), 'Excluir')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchInstallation(params, {
        code: this.codeFilter,

        name: this.nameFilter,

        description: this.descriptionFilter,
        typeId: (this.typeFilter || { id: null }).id,
        projectId: (this.projectFilter || { id: null }).id,
        addressId: (this.addressFilter || { id: null }).id,
        thirdMaterialPermission: this.thirdMaterialPermissionFilter,
      }))
      .addHeaderButton('Nova Instalação', () => this.newInstallation(), 'btn-new', 'fa-plus')
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV({
        code: this.codeFilter,

        name: this.nameFilter,

        description: this.descriptionFilter,
        type: this.typeFilter,
        project: this.projectFilter,
        address: this.addressFilter,
        thirdMaterialPermission: this.thirdMaterialPermissionFilter,
      }), 'btn-export', 'fa-share-square');

    this.form = this.fb.group({
      name: this.name,
      // code: this.code,
      description: this.description,
      type: this.type,
      project: this.project,
      address: this.address,
      thirdMaterialPermission: this.thirdMaterialPermission
    });
  }

  ngOnInit() {
    this.serviceCombo.fetchInstallationType().subscribe(response => {
      this.listInstallationType = response.data
    });
    this.serviceCombo.fetchAddress().subscribe(response => {
      this.listAddress = response.data
    });
    this.serviceCombo.fetchProject().subscribe(response => {
      this.listProject = response.data
    });
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public newInstallation() {
    this.edit = false;
    this.thirdMaterialPermission.setValue('false');
    this.openModal();
  }

  public clearFilters() {
    this.codeFilter = '';

    this.nameFilter = '';

    this.descriptionFilter = '';
    this.typeFilter = null;
    this.projectFilter = null;
    this.addressFilter = null;
    this.thirdMaterialPermissionFilter = null;
    this.listInstallationType = [];
    this.listProject = [];
    this.listAddress = [];
    this.serviceCombo.fetchInstallationType().subscribe(response => {
      this.listInstallationType = response.data
    });
    this.serviceCombo.fetchAddress().subscribe(response => {
      this.listAddress = response.data
    });
    this.serviceCombo.fetchProject().subscribe(response => {
      this.listProject = response.data
    });
  }

  public clearFields() {
    this.form.controls.name.setValue(null);
    // this.form.controls.code.setValue(null);
    this.form.controls.description.setValue(null);
    this.form.controls.type.setValue(new Combo);
    this.form.controls.project.setValue(new Combo);
    this.form.controls.address.setValue(new Combo);
    this.form.controls.thirdMaterialPermission.setValue(null);
  }

  public fillInstallationTypeCombo() {
    this.serviceCombo.fetchInstallationType().subscribe(response => {
      this.listInstallationType = response.data;
    });
  }

  public fillAddressCombo() {
    this.serviceCombo.fetchAddress().subscribe(response => {
      this.listAddress = response.data
    })
  }

  public fillProjectCombo() {
    this.serviceCombo.fetchProject().subscribe(response => {
      this.listProject = response.data;
    });
  }

  public delete(data: Installation): void {
    this.dialog.confirm('Atenção', 'Deseja realmente excluir o registro? <br> Após a confirmação não será possível recuperar a informação', () => {
      this.service.deleteInstallation(data.code).subscribe(() => {
        // this.service.deleteInstallation(data.id).subscribe(() => {
        this.genericPage.getData();
        this.serviceAlert.success("Registro excluído com sucesso", 3000);
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

  public openModal(): void {
    this.modalService.open(this.installationModal, { size: 'xl', backdrop: 'static' })
  }

  public modalEdit(data: Installation): void {
    this.edit = true;
    this.service.getInstallation(data.code).subscribe(installationRequest => {
      this.id = data.code;
      this.form.controls.name.setValue(installationRequest.data.name);

      // this.service.getInstallation(data.id).subscribe(installationRequest => {
      //   this.id = data.id;
      //   this.form.controls.code.setValue(installationRequest.data.code);

      this.form.controls.description.setValue(installationRequest.data.description);
      this.form.controls.type.setValue(installationRequest.data.typeId);
      this.form.controls.project.setValue(installationRequest.data.projectId);
      this.form.controls.address.setValue(installationRequest.data.addressId);
      this.form.controls.thirdMaterialPermission.setValue((installationRequest.data.thirdMaterialPermission).toString());
    });
    this.openModal();
  }

  public onSubmit() {
    if (!this.form.invalid) {
      const result = this.form.value;
      const request = new InstallationRequest();

      request.name = result.name;
      // request.code = result.code;
      request.description = result.description;
      request.typeId = result.type;
      request.projectId = result.project;
      request.addressId = result.address;
      request.thirdMaterialPermission = result.thirdMaterialPermission;

      if (this.edit) {
        request.code = this.id;
        // request.id = this.id;
        this.service.editInstallation(request, this.id).subscribe(() => {
          this.returnToPage();
        });
      } else {
        this.service.newInstallation(request).subscribe(() => {
          this.returnToPage();
        });
      }

    } else {
      Object.keys(this.form.controls).forEach(key => {
        if ((this[key].value === null || this[key].length === 0) && this[key].hasError('required')) {
          this[key].markAsDirty();
        }
      });
    }
  }

  public returnToPage(): void {
    this.form.reset();
    this.genericPage.getData();
    this.modalService.dismissAll();
  }
}