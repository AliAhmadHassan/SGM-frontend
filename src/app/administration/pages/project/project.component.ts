import { Component, ElementRef, ViewChild } from '@angular/core';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../../services/project.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Project, ProjectRequest } from '../../model/project.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ComboService } from 'src/app/shared/services/combo.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('ProjectModal', { static: true }) ProjectModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;

  public config;
  public idFilter = null;
  public codeFilter = null;
  public descriptionFilter = '';
  public initialsFilter = '';
  public activeFilter = null;
  public branchOfficeFilter = null;
  public form: FormGroup;
  public listBranch: any;
  public edit: boolean;
  private id: number = null;
  public code = this.fb.control(null);
  public description = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(250)],
    updateOn: 'blur'
  });
  public initials = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public branchOffice = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public active = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });

  constructor(private modalService: NgbModal,
    private service: ProjectService,
    private fb: FormBuilder,
    private serviceCombo: ComboService,
    private dialog: DialogService,
    private serviceAlert: AlertService) {
    this.config = new GenericPageFluent()
      .setTitle('Projetos')
      .setTable(new GenericTableFluent()
        .addTableColumn('Código', 'id')
        .addTableColumn('Descrição', 'description')
        .addTableColumn('Sigla', 'initials')
        .addTableColumn('Ativo', 'activeText')
        .addTableColumn('Filial', 'branchOffice', null, 'description')
        .addLineAction('', 'fa-edit', 'btn-success', (data) => this.modalEdit(data), 'Editar')
        .addLineAction('', 'fa-trash-alt', 'btn-danger', (data) => this.delete(data), 'Excluir')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchProjects(params, {
        code: this.idFilter,
        description: this.descriptionFilter,
        initials: this.initialsFilter,
        active: this.activeFilter,
        branchOffice: this.branchOfficeFilter
      }))
      .addHeaderButton('Novo Projeto', () => this.newProject(), 'btn-filter', 'fa-plus')
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => service.downloadCSV({
        description: this.descriptionFilter,
        initials: this.initialsFilter,
        active: this.activeFilter,
        branchOffice: this.branchOfficeFilter
      }
      ), 'btn-export', 'fa-share-square')


    this.form = this.fb.group({
      code: this.code,
      description: this.description,
      initials: this.initials,
      branchOffice: this.branchOffice,
      active: this.active,
    })

    this.serviceCombo.fetchBranchOffice().subscribe(response => {
      this.listBranch = response.data
    })
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public openModal(): void {
    this.modalService.open(this.ProjectModal, { size: 'xl', backdrop: 'static' });
  }

  public newProject(): void {
    this.edit = false;
    this.active.setValue('true');
    this.openModal();
  }

  public modalEdit(data: Project): void {
    this.edit = true;
    this.form.controls.description.setValue(data.description);
    this.form.controls.initials.setValue(data.initials);
    this.form.controls.branchOffice.setValue(data.branchOffice.id);
    this.form.controls.active.setValue((data.active).toString());
    this.id = data.id;
    this.openModal();
  }

  public delete(data: Project): void {
    this.dialog.confirm('Atenção', 'Deseja realmente excluir o registro? <br> Após a confirmação não será possível recuperar a informação', () => {
      this.service.deleteProject(data.id).subscribe(() => {
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
    this.idFilter = null;
    this.descriptionFilter = '';
    this.initialsFilter = '';
    this.activeFilter = null
    this.branchOfficeFilter = null
  }

  public clearFields() {
    this.form.controls.code.setValue(null);
    this.form.controls.description.setValue(null);
    this.form.controls.initials.setValue(null);
    this.form.controls.branchOffice.setValue(null);
    this.form.controls.active.setValue(null);
  }

  public onSubmit() {
    if (!this.form.invalid) {
      const result = this.form.value;
      const request = new ProjectRequest();

      request.description = result.description;
      request.initials = result.initials;
      request.active = result.active;
      request.branchOfficeId = result.branchOffice;

      if (this.edit) {
        this.service.editProject(request, this.id).subscribe(() => {
          this.returnToPage();
        });
      } else {
        this.service.newProject(request).subscribe(() => {
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
