import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ComboService } from 'src/app/shared/services/combo.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import ModalSize from 'src/app/shared/enums/modal-size.enum';
import { FormWithInvoiceAndWithOrderService } from '../../services/form-with-invoice-and-with-order.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-divergence-modal',
  templateUrl: './divergence-modal.component.html',
  styleUrls: ['./divergence-modal.component.scss']
})
export class DivergenceModalComponent {

  @ViewChild(ModalComponent, {static: true}) modalComponent: ModalComponent;
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('labelImportAttachments', { static: false }) labelImportAttachments: ElementRef;

  @Input() receivementId;

  public additionalAttachments: FileList;
  public modalSize = ModalSize;
  public divergenceTypeList: any;
  public index: number = 0;
  public files: FileList;
  public divergenceForm: FormGroup;
  public type = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(128)],
    updateOn: 'blur'
  });
  public description = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(128)],
    updateOn: 'blur'
  });
  public note = this.fb.control(null, {
    validators: [Validators.required, Validators.maxLength(128)],
    updateOn: 'blur'
  });

  constructor(private fb: FormBuilder,
    private comboService: ComboService,
    public service: FormWithInvoiceAndWithOrderService,
    private serviceAlert: AlertService,
    private dialog: DialogService,) {
    this.divergenceForm = this.fb.group({
      type: this.type,
      description: this.description,
      note: this.note,
      additionalAttachments: this.additionalAttachments
    });
    this.comboService.fetchDivergenceType().subscribe(response => {
      this.divergenceTypeList = response.data;
    });
   }

  public fillDivergenceCombo() {
    this.comboService.fetchDivergenceType().subscribe(response => {
      this.divergenceTypeList = response.data;
    });
  }

  public cancelAction() {
    this.dialog.confirm('Atenção', 'Deseja realmente cancelar a operação? <br> As informações serão perdidas e as modificações desconsideradas.',
      () => {
        this.divergenceForm.reset();
        this.genericPage.getData();
      }, "NoEmoticon", "Sim",
      () => {
        this.show();
      }, "NoEmoticon", "Não")
  }

  public attachmentsHandler(uploadFiles: FileList) {
    this.additionalAttachments = uploadFiles
    this.labelImportAttachments.nativeElement.innerHTML = Array.from(this.additionalAttachments)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  public onSubmit() {
    if (!this.divergenceForm.invalid) {
      const result = this.divergenceForm.value
      var formData = new FormData();
      formData.append("StatusId", result.type);
      formData.append("Description", result.description);
      formData.append("ReceivementId", this.receivementId);
      formData.append("Note", result.note);
      if (this.additionalAttachments != null) {
        for (this.index = 0; this.index < this.additionalAttachments.length; this.index++) {
          formData.append("File", this.additionalAttachments[this.index]);
        }
      }
      this.service.registerDivergence(formData).subscribe(() => {
        this.serviceAlert.success('Divergência salva com sucesso', 3000);
        this.divergenceForm.reset();
        this.hide();
      })
    }
  }

  public show(){
    this.modalComponent.show();
  }

  public hide(){
    this.modalComponent.hide();
  }
}
