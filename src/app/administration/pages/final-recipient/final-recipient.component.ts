import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';
import { FinalRecipientService } from '../../services/final-recipient.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ComboService } from 'src/app/shared/services/combo.service';
import Recipient from '../../model/recipient.model';

@Component({
  selector: 'app-final-recipient',
  templateUrl: './final-recipient.component.html',
  styleUrls: ['./final-recipient.component.scss']
})
export class FinalRecipientComponent implements OnInit {
  @ViewChild('filterModal', { static: true }) filterModal: ElementRef;
  @ViewChild('recipientModal', { static: true }) AddressModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;

  public config;
  public codeFilter: number = null;
  public descriptionFilter: string = '';
  public addressFilter: string = '';
  public receiverTypeIdFilter: number = null;
  public receiverTypeTextFilter: string = null;
  public edit: boolean = false;
  public form: FormGroup;
  public description = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(250)],
    updateOn: 'blur'
  });

  public address = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(250)],
    updateOn: 'blur'
  });

  public receiverTypeId = this.fb.control(null, {
    validators: [Validators.required],
    updateOn: 'blur'
  });
  public listReceiverType: any;
  public id: number = 0;

  constructor(private modalService: NgbModal,
    private service: FinalRecipientService,
    private dialog: DialogService,
    private serviceCombo: ComboService,
    private fb: FormBuilder) {
    this.config = new GenericPageFluent()
      .setTitle('Destinatário Final')
      .setTable(new GenericTableFluent()
        .addTableColumn('Código', 'id')
        .addTableColumn('Nome', 'description')
        .addTableColumn('Endereço', 'address')
        .addTableColumn('Tipo', 'receiverTypeText')
        .addLineAction('', 'fa-edit', 'btn-success', (data) => this.modalEdit(data), 'Editar')
        .addLineAction('', 'fa-trash-alt', 'btn-danger', (data) => this.delete(data), 'Excluir')
      )
      .setItemsPerPage(20)
      .setRequestService((params) => this.service.fetchReceiver(params, {
        code: this.codeFilter,
        description: this.descriptionFilter,
        address: this.addressFilter,
        receiverTypeText: this.receiverTypeTextFilter
      }))
      .addHeaderButton('Novo Destinatário', () => this.newRecipent(), 'btn-filter', 'fa-plus')
      .addHeaderButton('Filtros', () => this.modalFilters(), 'btn-filter', 'fa-filter')
      .addFooterButton('Imprimir', () => window.print(), 'btn-print', 'fa-print')
      .addFooterButton('Exportar', () => this.service.downloadCSV({
        code: this.codeFilter,
        description: this.descriptionFilter,
        address: this.addressFilter,
        receiverTypeText: this.receiverTypeTextFilter
      }), 'btn-export', 'fa-share-square');

    this.form = this.fb.group({

      description: this.description,
      receiverTypeId: this.receiverTypeId,
      address: this.address
    });
  }

  ngOnInit() {
    this.serviceCombo.fetchReceiverType().subscribe(response => {
      this.listReceiverType = response.data;
    });
  }

  public clearFilters() {
    this.codeFilter = null;
    this.descriptionFilter = '';
    this.addressFilter = null;
    this.receiverTypeTextFilter = null;
  }

  public newRecipent() {
    this.edit = false;
    this.modalService.open(this.AddressModal, { size: 'xl', backdrop: 'static' })
  }

  public modalFilters() {
    this.modalService.open(this.filterModal, { size: 'xl', backdrop: 'static' })
  }

  public modalEdit(data: Recipient) {
    this.edit = true;
    this.id = data.id
    this.form.controls.description.setValue(data.description)
    this.form.controls.address.setValue(data.address)
    this.form.controls.receiverTypeId.setValue(data.receiverTypeId)
    this.modalService.open(this.AddressModal, { size: 'xl', backdrop: 'static' })
  }

  public clearFields() {
    this.form.controls.description.setValue(null)
    this.form.controls.address.setValue(null)
    this.form.controls.receiverTypeId.setValue(null)
  }

  public delete(data): void {
    this.dialog.confirm('Atenção', 'Deseja realmente excluir o registro? <br> Após a confirmação não será possível recuperar a informação', () => {
      this.service.deleteReceiver(data.id).subscribe(() => {
        this.genericPage.getData();
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
        this.newRecipent();
      }, "NoEmoticon", "Não")
  }

  public onSubmit() {
    if (!this.form.invalid) {
      const result = this.form.value;
      const request = new Recipient();

      request.description = result.description;
      request.receiverTypeId = result.receiverTypeId;
      request.address = result.address;

      if (this.edit) {
        request.id = this.id;
        this.service.changeReceiver(request).subscribe(() => {
          this.returnToPage();
        });
      } else {
        this.service.registerReceiver(request).subscribe(() => {
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
