import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ComboService } from 'src/app/shared/services/combo.service';
import { ProfileRequest } from '../../model/profile.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileFilterModal', { static: true }) profileFilterModal: ElementRef;
  @ViewChild('profileModal', { static: true }) profileModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;

  public config;
  public nameFilter = '';
  public descriptionFilter;
  public permissionsFilter = null;
  public listPermissions: any;
  public permissions: any = [];
  public form: FormGroup;
  public edit: boolean = false;
  public id: number = null;
  public listActions: any;
  public name = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public description = this.fb.control(null, {
    validators: [Validators.maxLength(250)],
    updateOn: 'blur'
  });

  constructor(public service: ProfileService,
    private serviceCombo: ComboService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dialog: DialogService,
    private serviceAlert: AlertService) {
    this.config = new GenericPageFluent()
      .setTitle('Perfis')
      .setTable(new GenericTableFluent()
        .addTableColumn('Nome', 'name')
        .addTableColumn('Descrição', 'description')
        .addTableColumn('Permissões', 'permissions')
        .addLineAction('', 'fa-edit', 'btn-success', (data) => this.modalEdit(data.id), 'Editar')
        .addLineAction('', 'fa-trash-alt', 'btn-danger', (data) => this.deleteProfile(data.id), 'Excluir')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fecthProfile(params, {
        name: this.nameFilter,
        description: this.descriptionFilter,
        permission: this.permissionsFilter
      }))
      .addHeaderButton('Novo Perfil', () => this.modalNewProfile(), 'btn-new', 'fa-plus')
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV(
        {
          name: this.nameFilter,
          description: this.descriptionFilter,
          permission: this.permissionsFilter
        }), 'btn-export', 'fa-share-square');

    this.form = this.fb.group({
      name: this.name,
      description: this.description
    });
  }

  ngOnInit(): void {
    this.serviceCombo.fetchParentAction().subscribe((response) => {
      this.listPermissions = response.data;
    })
    this.service.fetchActions().subscribe((response: any) => {
      this.listActions = response.map(data => {
        return {
          id: data.id, description: data.description, actions: data.actions.map((action) => {
            return { id: action.id, description: action.description, checked: false }
          }), allActions: false, checked: false
        };
      });
    })
  }

  public modalNewProfile() {
    this.clearPermissions();
    this.edit = false;
    this.modalService.open(this.profileModal, { size: 'xl', backdrop: 'static' });
  }

  public modalFilters() {
    this.modalService.open(this.profileFilterModal, { size: 'xl', backdrop: 'static' });
  }

  public clearFilters() {
    this.nameFilter = '';
    this.permissionsFilter = null;
    this.descriptionFilter = '';
  }

  public clearPermissions() {
    this.permissions = [];
    this.listActions.forEach((parentsAction) => {
      parentsAction.checked = false;
      parentsAction.allActions = false;
      parentsAction.actions.forEach(action => {
        action.checked = false
      });
    })
  }

  public modalEdit(id): void {
    let profile: any
    this.edit = true;
    this.service.fetchProfileId(id).subscribe((response) => {
      profile = response.data;
      this.id = profile.id;
      this.form.controls.name.setValue(profile.name);
      this.form.controls.description.setValue(profile.description);
      this.permissions = profile.permissions;
      this.checkedPermissionsEdition(profile.permissions);
    })

    this.modalService.open(this.profileModal, { size: 'xl', backdrop: 'static' });
  }

  public checkedPermissionsEdition(actionsOfProfile) {
    actionsOfProfile.forEach((id) => {
      if (this.listActions.find((data) => data.id == id)) {
        this.listActions.find((data) => data.id == id).checked = true;
      } else {
        this.listActions.forEach((parentAction) => {
          parentAction.actions.forEach((data) => {
            if (data.id == id) {
              data.checked = true
            }
          })
        })
      }
    })
  }

  public setChecked(lisParentAction, checked) {
    this.updatePermissions(lisParentAction.id, !checked);
    lisParentAction.allActions = checked;
    lisParentAction.checked = checked;
    lisParentAction.actions.forEach((data) => {
      this.updatePermissions(data.id, data.checked);
      data.checked = checked;
    })
  }

  public selectAllChildrenOfParentAction(parentAction) {
    if (parentAction.allActions || parentAction.checked) {
      this.setChecked(parentAction, false);
    } else {
      this.setChecked(parentAction, true);
    }
  }

  public selectAction(action, parentActionId) {
    this.updatePermissions(action.id, action.checked);
    action.checked = !action.checked;
    let parentAction = this.listActions.find((data) => data.id == parentActionId);
    let isCheckedAction = parentAction.actions.find((data) => data.checked == true)
    this.listActions.find((data) => data.id == parentActionId).checked = isCheckedAction ? true : false;
  }

  public updatePermissions(id, remove = false) {
    let existingAction = !!this.permissions.find((actionId) => actionId == id);
    if (!existingAction) {
      this.permissions.push(id);
    }
    if (existingAction && remove) {
      this.permissions.splice(this.permissions.indexOf(id), 1);
    }
  }

  public deleteProfile(profileId) {
    this.dialog.confirm('Atenção', 'Deseja realmente excluir o registro? <br> Após a confirmação não será possível recuperar a informação', () => {
      this.service.deleteProfile(profileId).subscribe(() => {
        this.serviceAlert.success('Registro excluído com sucesso', 3000);
        this.genericPage.getData();
      })
    })
  }

  public cancelAction() {
    this.dialog.confirm('Atenção', 'Deseja realmente cancelar a operação? <br> As informações serão perdidas e as modificações desconsideradas.', () => {
      this.genericPage.getData();
      this.form.reset();
      this.clearPermissions();
    }, "NoEmoticon", "Sim", () => {
      this.modalNewProfile();
    }, "NoEmoticon", "Não")
  }

  public onSubmit() {
    if (!this.invalidPermissions() && !this.form.invalid) {
      const result = this.form.value;
      const request = new ProfileRequest();
      request.description = result.description;
      request.name = result.name;
      request.permissions = this.permissions;
      if (this.edit) {
        this.service.changeProfile(request, this.id).subscribe(() => {
          this.form.reset();
          this.genericPage.getData();
          this.modalService.dismissAll(true);
        });
      } else {
        this.service.registerProfile(request).subscribe(() => {
          this.form.reset();
          this.genericPage.getData();
          this.modalService.dismissAll(true);
          this.clearPermissions();
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

  private invalidPermissions() {
    if (this.permissions.length == 0) {
      return this.form.setErrors({ invalidPermissions: true });
    } else {
      if (this.form.getError('invalidPermissions')) {
        this.form.errors.invalidPermissions = false;
      }
      return false;
    }
  }
}
