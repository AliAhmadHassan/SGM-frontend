import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Combo } from 'src/app/administration/model/combo.model';
import { UserService } from 'src/app/administration/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormWithInvoiceAndWithOrderService } from '../../services/form-with-invoice-and-with-order.service';
import { DivergenceModalComponent } from '../../components/divergence-modal/divergence-modal.component';

@Component({
  selector: 'app-form-with-invoice-and-with-order',
  templateUrl: './form-with-invoice-and-with-order.component.html',
  styleUrls: ['./form-with-invoice-and-with-order.component.scss']
})
export class FormWithInvoiceAndWithOrderComponent {

  @ViewChild(DivergenceModalComponent, { static: true }) divergenceModal: DivergenceModalComponent
  @ViewChild('labelImportPhotos', {static: false}) labelImportPhotos: ElementRef;
  @ViewChild('labelImportAttachments', {static: false}) labelImportAttachments: ElementRef;

  public index: number = 0;
  public id: number = null;
  public data: any;
  public orderCode: any;
  public email: string;
  public name: string;
  public response: any
  public divergenceTypeList: any;
  public stringEmailList: string = '';

  public files: FileList;
  public receivementPhotos: FileList;
  public additionalAttachments: FileList;
  public receive
  public fileResult: any;

  public listNamesAd: Array<Object>;
  public listEmailsAd: Array<Object> = [{ id: null, email: null }];
  public responsibles: any;
  public draft: boolean = false;
  public sendId: any;

  public newReceivementDate: string = '';
  public newInvoiceDate: string = '';
  public arrayReceivementAmount = [];

  public invoiceResult: string;
  public invoiceDateResult: string;
  public complementResult: string;
  public receiverUserResult: number;
  public receivementDateResult: string;
  public receivementAmountResult;
  public vehiclePlateResult: string;
  public driverNameResult: string;
  public driverTelephoneResult: string;
  public emailsResult: string;
  public commentsResult: string;

  public fileToUpload: File = null;

  public form: FormGroup;
  public orderId = this.fb.control({ value: null, disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public invoice = this.fb.control(null, {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public invoiceDate = this.fb.control('', {
    validators: [Validators.maxLength(10)],
    updateOn: 'blur'
  });
  public complement = this.fb.control('', {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public receiverUser = this.fb.control(null, {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public receivementDate = this.fb.control('', {
    validators: [Validators.maxLength(10)],
    updateOn: 'blur'
  });
  public receivementAmount = this.fb.control([], {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public vehiclePlate = this.fb.control('', {
    validators: [Validators.maxLength(8)],
    updateOn: 'blur'
  });
  public driverName = this.fb.control('', {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public driverTelephone = '';
  public comments = this.fb.control('', {
    validators: [Validators.maxLength(300)],
    updateOn: 'blur'
  });
  public isDraft = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public invoiceTypeId = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public emails = this.fb.control([], {
    validators: [Validators.maxLength(250)],
    updateOn: 'blur'
  });

  @ViewChild('divergencesModal', { static: true }) divergencesModal: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('myInput', { static: true }) InputFile: ElementRef;

  constructor(private modalService: NgbModal,
    private comboService: ComboService,
    public service: FormWithInvoiceAndWithOrderService,
    private fb: FormBuilder,
    public userService: UserService,
    private serviceAlert: AlertService) {
    this.orderCode = sessionStorage.getItem('lastFormId');
    this.sendId = this.orderCode;
    this.service.fetchDetailsModal(this.orderCode).subscribe(
      (response) => {
        this.data = response.data;
        this.fillArrayReceivementAmount();
      });
    this.form = this.fb.group({
      orderId: this.orderCode,
      invoice: this.invoice,
      invoiceDate: this.invoiceDate,
      complement: this.complement,
      receiverUser: this.receiverUser,
      receivementDate: this.receivementDate,
      receivementAmount: this.receivementAmount,
      vehiclePlate: this.vehiclePlate,
      driverName: this.driverName,
      driverTelephone: this.driverTelephone,
      comments: this.comments,
      isDraft: this.isDraft,
      invoiceTypeId: this.invoiceTypeId,
      emails: this.emails,
      receivementPhotos: this.receivementPhotos,
      additionalAttachments: this.additionalAttachments,
    });
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data
    });
  }

  ngOnInit() {
    this.comboService.fetchDivergenceType().subscribe(response => {
      this.divergenceTypeList = response.data;
    });
  }

  public fillArrayReceivementAmount() {
    for (let i = 0; i < this.data.orderItem.length; i++) {
      this.arrayReceivementAmount[i] = 0;
    }
  }

  public fillDivergenceCombo() {
    this.comboService.fetchDivergenceType().subscribe(response => {
      this.divergenceTypeList = response.data;
    });
  }

  public fillUserCombo() {
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data;
    });
  }

  public maskTel: string = '';
  public previousLength: number = 0;
  public telephoneFilter = '';
  public maskTelephone() {
    var telephone: string = this.telephoneFilter;
    if (telephone.length <= 10) {
      this.maskTel = '(00) 0000-0000';
    }
    if (telephone.length == 10 && this.previousLength == 10) {
      this.maskTel = '(00) 0 0000-0000';
    }
    this.previousLength = telephone.length;
  }

  public openDivergencesModal() {
    this.divergenceModal.show();
  }

  private formatEmailList(emailList: string): string {
    return emailList.slice(0, this.stringEmailList.length - 2);
  }

  private getEmailString() {
    let emailList = this.emails.value;
    let stringList: string = '';
    for (let i = 0; i < emailList.length; i++) {
      stringList += emailList[i].label + ', ';
    }
    return stringList;
  }

  private getEmails() {
    return this.formatEmailList(this.getEmailString());
  }

  public reviewOrder() {
    this.service.fetchDetailsModal(this.orderCode).subscribe(
      (response) => {
        this.data = response.data
      });
    const result = this.form.value;
    this.invoiceResult = result.invoice;
    this.invoiceDateResult = this.newInvoiceDate;
    this.complementResult = result.complement;
    this.receiverUserResult = this.getResponsibleId(result.receiverUser);
    this.vehiclePlateResult = result.vehiclePlate;
    this.driverNameResult = result.driverName;
    this.driverTelephoneResult = result.driverTelephone;
    this.receivementDateResult = this.newReceivementDate;
    this.emailsResult = this.getEmails();
    this.commentsResult = result.comments;
    this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
  }

  private getResponsibleId(receiverUser: string): number {
    if (receiverUser) {
      return this.responsibles.find(responsible => responsible.id == receiverUser)['text'];
    }
    return null;
  }

  fileHandler(uploadFiles: FileList) {
    this.files = uploadFiles
  }

  attachmentsHandler(uploadFiles: FileList) {
    this.additionalAttachments = uploadFiles
  }

  photosHandler(uploadFiles: FileList) {
    this.receivementPhotos = uploadFiles;
    this.fileToUpload = this.receivementPhotos.item(0);
  }

  public cancelAction() {
    this.InputFile.nativeElement.value = "";
    this.form.controls.type.setValue(new Combo);
  }

  public setInvoiceDate(date: string): void {
    if (date) {
      this.form.value.invoiceDate = date;
      this.newInvoiceDate = this.form.value.invoiceDate;
    }
  }

  public setReceivementDate(date: string): void {
    if (date) {
      this.form.value.receivementDate = date;
      this.newReceivementDate = this.form.value.receivementDate;
    }
  }

  public SaveData(result: any) {
    var formData: FormData = new FormData();
    formData.append('OrderId', result.orderId);
    if (result.invoice) {
      formData.append('Invoice', result.invoice);
    }
    formData.append('InvoiceDate', this.newInvoiceDate);
    formData.append('Complement', result.complement);
    if (result.receiverUser) {
      formData.append('ReceiverUser', result.receiverUser);
    }
    formData.append('ReceivementDate', this.newReceivementDate);
    formData.append('VehiclePlate', result.vehiclePlate);
    formData.append('DriverName', result.driverName);
    formData.append('DriverTelephone', result.driverTelephone);
    formData.append('Comments', result.comments);
    formData.append('InvoiceTypeId', '1');
    formData.append('Emails', this.getEmails());
    for (this.index = 0; this.index < this.arrayReceivementAmount.length; this.index++) {
      formData.append('ReceivementAmount', this.arrayReceivementAmount[this.index]);
    }

    if (this.additionalAttachments != null) {
      for (this.index = 0; this.index < this.additionalAttachments.length; this.index++) {
        formData.append("Attachments", this.additionalAttachments[this.index]);
      }
    }
    if (this.receivementPhotos != null) {
      for (this.index = 0; this.index < this.receivementPhotos.length; this.index++) {
        formData.append("Photos", this.receivementPhotos[this.index]);
      }
    }
    return formData;
  }

  public setReceivementValue(event: any, i: number): void {
    let value = event.target.value;

    if(!value) {
      value = 0;
    }

    this.arrayReceivementAmount[i] = value
  }

  public getReceivementValue(i: number): void {
    return this.arrayReceivementAmount[i];
  }

  public saveAsDraft() {
    var request = this.SaveData(this.form.value);
    this.service.receivementInvoiceOrderDraft(request).subscribe((response) => {
      this.response = response;
      this.serviceAlert.success("Rascunho salvo com sucesso!", 3000);
    });
  }

  public SaveReceivement() {
    var request = this.SaveData(this.form.value);
    this.service.receivementInvoiceOrder(request).subscribe((response) => {
      this.response = response;
      this.serviceAlert.success("Salvo com sucesso!", 3000);
    });
  }
}
