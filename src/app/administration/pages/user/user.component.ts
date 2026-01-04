import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ComboService } from 'src/app/shared/services/combo.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { User, UserRequest } from '../../model/user.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Association } from '../../model/association.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('userModal', { static: true }) userModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;

  public config;
  public nameFilter = '';
  public profileFilter = null;
  public instalationsFilter = null;
  public activeFilter = '';
  public form: FormGroup;
  public edit: boolean;
  private id: number = null;
  public name = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public email = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(250)],
    updateOn: 'blur'
  });
  public userProfileId = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public installationId = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public active = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public listProfile: any;
  public listInstallation: any;
  public associationList: Association[];
  public listNamesAd: Array<Object>;

  constructor(public service: UserService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private serviceCombo: ComboService,
    private dialog: DialogService,
    private serviceAlert: AlertService) {

    this.associationList = [new Association];
    this.config = new GenericPageFluent()
      .setTitle('Usuários')
      .setTable(new GenericTableFluent()
        .addTableColumn('Usuário', 'name')
        .addTableColumn('Instalações/Perfil', 'nameInstallations')
        .addTableColumn('Status', 'activeText')
        .addLineAction('', 'fa-edit', 'btn-success', (data) => this.modalEdit(data), 'Editar')
        .addLineAction('', 'fa-trash-alt', 'btn-danger', (data) => this.deleteUser(data.id), 'Excluir')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchUser(params, {
        UserName: this.nameFilter,
        ProfileName: this.profileFilter,
        InstallationName: this.instalationsFilter,
        Active: this.activeFilter
      }))
      .addHeaderButton('Novo Usuário', () => this.newUser(), 'btn-new', 'fa-plus')
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV({
        UserName: this.nameFilter,
        ProfileName: this.profileFilter,
        InstallationName: this.instalationsFilter,
        Active: this.activeFilter
      }), 'btn-export', 'fa-share-square');

    this.form = this.fb.group({
      name: this.name,
      email: this.email,
      userProfileId: this.userProfileId,
      installationId: this.installationId,
      active: this.active
    });
  }

  ngOnInit() {
    this.serviceCombo.fetchProfile().subscribe(response => {
      this.listProfile = response.data
    });
    this.serviceCombo.fetchInstallation().subscribe(response => {
      this.listInstallation = response.data
    });
    this.service.fetchNameAd().subscribe((response: any) => {
      this.listNamesAd = response.map(data => {
        return { text: data.name + ' → ' + data.email, name: data.name, email: data.email };
      });
    })
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' });
  }

  public openModal(): void {
    this.modalService.open(this.userModal, { size: 'xl', backdrop: 'static' });
  }

  public deleteUser(id) {
    this.dialog.confirm('Atenção', 'Deseja realmente excluir o registro? <br> Após a confirmação não será possível recuperar a informação', () => {
      this.service.deleteUser(id).subscribe(() => {
        this.genericPage.getData();
        this.serviceAlert.success("Registro excluído com sucesso", 3000);
      })
    })
  }

  public cancelAction() {
    this.dialog.confirm('Atenção', 'Deseja realmente cancelar a operação? <br> As informações serão perdidas e as modificações desconsideradas.', () => {
      this.genericPage.getData();
      this.associationList = [null];
      this.form.reset();
    }, "NoEmoticon", "Sim", () => {
      this.openModal();
    }, "NoEmoticon", "Não")
  }

  public setNameAndEmail(data) {
    this.form.controls.name.setValue(data.name);
    this.form.controls.email.setValue(data.email);
  }

  public fillProfileCombo() {
    this.serviceCombo.fetchProfile().subscribe(response => {
      this.listProfile = response.data;
    });
  }

  public fillInstallationCombo() {
    this.serviceCombo.fetchInstallation().subscribe(response => {
      this.listInstallation = response.data;
    })
  }

  public clearFilters() {
    this.nameFilter = '';
    this.profileFilter = null;
    this.instalationsFilter = null;
    this.activeFilter = '';
  }

  public clearFields() {
    this.form.controls.name.setValue(null);
    this.form.controls.email.setValue(null);
    this.form.controls.userProfileId.setValue(null);
    this.form.controls.installationId.setValue(null);
    this.form.controls.active.setValue(null);
  }

  public modalEdit(data: User): void {
    this.edit = true;
    let arrayInstalations = [];
    let arrayProfiles = [];
    this.id = data.id;
    this.form.controls.name.setValue(data.name);


    data.profileInstallation.forEach((instalations) => {
      arrayInstalations.push(instalations.installationId);
    });

    data.profileInstallation.forEach((profile) => {
      arrayProfiles.push(profile.profileId);
    });

    this.form.controls.installationId.setValue(arrayInstalations[0]);
    this.form.controls.userProfileId.setValue(arrayProfiles[0]);

    this.form.controls.email.setValue(data.email);
    this.form.controls.active.setValue((data.active).toString());
    this.openModal();
  }

  public newUser() {
    this.edit = false;
    this.active.setValue('true');
    this.openModal();
  }

  public newAssociation(installationId: number, userProfileId: number) {
    let newAssociation = new Association();
    const result = this.form.value;
    newAssociation.installationId = result.installationId;
    newAssociation.userProfileId = result.userProfileId;
    this.associationList.push(newAssociation);
  }

  public DeleteAssociation(association: Association) {
    let index = this.associationList.indexOf(association);
    this.associationList.splice(index, 1);
  }

  public onSubmit() {
    if (this.form.valid) {
      const result = this.form.value;
      const request = new UserRequest();
      let newAssociationList = this.associationList.slice(1)
      request.name = result.name;
      request.email = result.email;
      request.associations = newAssociationList;
      request.active = result.active;
      if (this.edit) {
        this.service.editUser(request, this.id).subscribe(() => {
          this.returnToPage();
        });
      } else {
        this.service.registerUser(request).subscribe(() => {
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
    this.modalService.dismissAll();
  }
}
