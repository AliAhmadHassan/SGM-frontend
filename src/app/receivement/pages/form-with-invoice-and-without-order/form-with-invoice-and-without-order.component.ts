import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { FormWithInvoiceAndWithoutOrderService } from '../../services/form-with-invoice-and-without-order.service';
import MaterialItem from '../../models/material-item.model';
import { DivergenceModalComponent } from '../../components/divergence-modal/divergence-modal.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-form-with-invoice-and-without-order',
  templateUrl: './form-with-invoice-and-without-order.component.html',
  styleUrls: ['./form-with-invoice-and-without-order.component.scss']
})
export class FormWithInvoiceAndWithoutOrderComponent implements OnInit {

  @ViewChild(DivergenceModalComponent, { static: true }) divergenceModal: DivergenceModalComponent
  
  public itemList: object[] = [new MaterialItem];
  public receivementPhotos: FileList;
  public additionalAttachments: FileList;
  public responsibles: any;
  public divergenceTypeList: any;
  public email: any
  public listEmailsAd: any;
  public providerReason: any;
  public providers: any;
  public sendId: any;
  public response: any;
  public materials: any;
  public stringEmailList: string = '';

  public newReceivementDate: string = '';
  public newInvoiceDate: string = '';

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
  public receivementProviderReasonResult: string;
  public providerResult: number;

  public form: FormGroup;
  public provider = this.fb.control(null, {
    validators: [Validators.maxLength(100)],
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
  public reasonId = this.fb.control(null, {
    validators: [],
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
  public vehiclePlate = this.fb.control('', {
    validators: [Validators.maxLength(8)],
    updateOn: 'blur'
  });
  public driverName = this.fb.control('', {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public driverNumber = '';
  public installationId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public emails = this.fb.control([], {
    validators: [Validators.maxLength(250)],
    updateOn: 'blur'
  });
  public comments = this.fb.control('', {
    validators: [Validators.maxLength(300)],
    updateOn: 'blur'
  });
  public photos = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public attachments = this.fb.control(null, {
    validators: [],
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
  public materialWithoutOrder = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });

  public divergenceForm: FormGroup;
  public type = this.fb.control(null, {
    validators: [Validators.maxLength(128)],
    updateOn: 'blur'
  });
  public description = this.fb.control(null, {
    validators: [Validators.maxLength(128)],
    updateOn: 'blur'
  });
  public note = this.fb.control(null, {
    validators: [Validators.maxLength(128)],
    updateOn: 'blur'
  });
  public files: FileList;

  @ViewChild('divergencesModal', { static: true }) divergencesModal: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;
  @ViewChild('myInput', { static: true }) InputFile: ElementRef;

  constructor(private modalService: NgbModal,
    private comboService: ComboService,
    private fb: FormBuilder,
    public userService: UserService,
    private service: FormWithInvoiceAndWithoutOrderService,
    private alertService: AlertService) {
    this.form = this.fb.group({
      invoice: this.invoice,
      invoiceDate: this.invoiceDate,
      complement: this.complement,
      reasonId: this.reasonId,
      receiverUser: this.receiverUser,
      provider: this.provider,
      receivementDate: this.receivementDate,
      vehiclePlate: this.vehiclePlate,
      driverName: this.driverName,
      driverNumber: this.driverNumber,
      installationId: this.installationId,
      emails: this.emails,
      comments: this.comments,
      photos: this.photos,
      attachments: this.attachments,
      isDraft: this.isDraft,
      invoiceTypeId: this.invoiceTypeId,
      materialWithoutOrder: this.materialWithoutOrder
    });
    this.divergenceForm = this.fb.group({
      type: this.type,
      description: this.description,
      note: this.note,
      files: this.files
    });
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data
    });
    this.service.comboProviders().subscribe(response => {
      this.providers = response.data;
    });
    this.service.comboProviderReason().subscribe(response => {
      this.providerReason = response.data;
    });
  }

  ngOnInit() {
    this.userService.fetchNameAd().subscribe((response: any) => {
      this.listEmailsAd = response.map(data => {
        return { text: data.name + ' → ' + data.email, name: data.name, email: data.email };
      });
    });

    this.customSearchFn();
  }

  public openDivergencesModal(): void {
    this.divergenceModal.show();
  }

  public fillEmailCombo() {
    this.userService.fetchNameAd().subscribe((response: any) => {
      this.listEmailsAd = response.map(data => {
        return { text: data.name + ' → ' + data.email, name: data.name, email: data.email };
      });
    })
  }

  public fillProvidersCombo() {
    this.service.comboProviders().subscribe(resp => {
      this.providers = resp.data;
    });
  }

  public fillProviderReasonCombo() {
    this.service.comboProviderReason().subscribe((resp) => {
      this.providerReason = resp.data;
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

  private getResponsibleId(receiverUser: string): number {
    if (receiverUser) {
      return this.responsibles.find(responsible => responsible.id == receiverUser)['text'];
    }
    return null;
  }

  private getProviderId(providerResult: string): number {
    if (providerResult) {
      return this.providers.find(provider => provider.id == providerResult)['text'];
    }
    return null;
  }

  private getReasonId(reasonResult: string): string {
    if (reasonResult) {
      return this.providerReason.find(reason => reason.id == reasonResult)['text'];
    }
    return null;
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
    const result = this.form.value;
    this.invoiceResult = result.invoice;
    this.invoiceDateResult = this.newInvoiceDate;
    this.complementResult = result.complement;
    this.receiverUserResult = this.getResponsibleId(result.receiverUser);
    this.vehiclePlateResult = result.vehiclePlate;
    this.driverNameResult = result.driverName;
    this.driverTelephoneResult = result.driverNumber;
    this.receivementDateResult = this.newReceivementDate;
    this.emailsResult = this.getEmails();
    this.commentsResult = result.comments;
    this.receivementProviderReasonResult = this.getReasonId(result.reasonId);
    this.providerResult = this.getProviderId(result.provider);
    this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
  }

  public addNewItem(): void {
    this.itemList.push(new MaterialItem);
  }

  public setUnityPrice(event: any, index: number): void {
    this.itemList[index]['unityPrice'] = event.target.value;
  }

  public setQuantity(event: any, index: number): void {
    this.itemList[index]['receivementAmount'] = event.target.value;
  }

  fileHandler(uploadFiles: FileList) {
    this.files = uploadFiles
  }

  attachmentsHandler(uploadFiles: FileList) {
    this.additionalAttachments = uploadFiles
  }

  photosHandler(uploadFiles: FileList) {
    this.receivementPhotos = uploadFiles
  }

  public SaveData(result: any) {
    var formData: FormData = new FormData();
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
    formData.append('DriverNumber', result.driverNumber);
    formData.append('Comments', result.comments);
    formData.append('InvoiceTypeId', '1');
    formData.append('Emails', this.getEmails());
    formData.append('MaterialWithoutOrder', JSON.stringify(this.itemList));
    if (result.provider) {
      formData.append('ProviderId', result.provider);
    }
    if (result.reasonId) {
      formData.append('ReasonWithoutOrderId', result.reasonId);
    }
    if (this.additionalAttachments != null) {
      for (let i = 0; i < this.additionalAttachments.length; i++) {
        formData.append("Attachments", this.additionalAttachments[i]);
      }
    }

    if (this.receivementPhotos != null) {
      for (let i = 0; i < this.receivementPhotos.length; i++) {
        formData.append("Photos", this.receivementPhotos[i]);
      }
    }
    return formData;
  }

  public saveAsDraft() {
    var request = this.SaveData(this.form.value);
    this.service.receivementInvoiceOrderDraft(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Rascunho salvo com sucesso!", 3000);
    });
  }

  public SaveReceivement() {
    var request = this.SaveData(this.form.value);
    this.service.receivementInvoiceOrder(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Salvo com sucesso!", 3000);
    });
  }

  public customSearchFn(event: any = '') {
    this.getMaterials(event.term);
  }

  public getMaterials(value = '') {
    let filters = { code: value.toString() };
    this.comboService.fetchMaterialWithoutOrder(filters).subscribe(response => {
      this.materials = response.data;
    });
  }

  public setMaterial(event, index) {
    if(event){
      this.itemList[index]['materialCode'] = event.code;
      this.itemList[index]['description'] = event.description;
      this.itemList[index]['unity'] = event.unity;
    }
    else{
      this.itemList[index] = new MaterialItem;
    }
  }

}
