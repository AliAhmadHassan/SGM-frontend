import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { DivergenceModalComponent } from '../../components/divergence-modal/divergence-modal.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormTransferBetweenInstallationsService } from '../../services/form-transfer-between-installations.service';

@Component({
  selector: 'app-form-transfer-between-installations',
  templateUrl: './form-transfer-between-installations.component.html',
  styleUrls: ['./form-transfer-between-installations.component.scss']
})
export class FormTransferBetweenInstallationsComponent implements OnInit {

  public responsibles: any;
  public newReceivementDate: string = '';
  public newInvoiceDate: string = '';
  public stringEmailList: string = '';
  public transferNumber: any;
  public data: any;
  public index: number = 0;
  public response: any
  public divergenceTypeList: any;
  public receivementPhotos: FileList;
  public additionalAttachments: FileList;
  public invoiceDoc: FileList;
  public fileToUpload: File = null;
  public sendId: any;

  public stmResult: string;
  public transferResult: string;
  public emissionDateResult: string;
  public transferStatusResult: string;
  public requesterResult: string;
  public approverResult: string;
  public sourceInstallationResult: string;
  public sourceCnpjResult: string;
  public targetInstallationResult: string;
  public targetCnpjResult: string;
  public invoiceEntranceResult: string;
  public invoiceNumberResult: string;
  public invoiceDateResult: string;
  public deliveryForecastResult: string
  public receiverUserResult: number;
  public shippingUserResult: number;
  public receivementDateResult: string;
  public shippingDateResult: string;
  public shippingVehiclePlateResult: string;
  public receivementVehiclePlateResult: string;
  public shippingdriverNameResult: string;
  public receivementDriverNameResult: string;
  public shippingDriverTelephoneResult: string;
  public receivementDriverTelephoneResult: string;
  public emailsResult: string;
  public commentsResult: string;

  public form: FormGroup;
  public stm = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public transfer = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public emissionDate = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public transferStatus = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public requester = this.fb.control({ value: null, disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public approver = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public sourceInstallation = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public sourceCnpj = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public targetInstallation = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public targetCnpj = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public invoiceEntrance = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public invoiceNumber = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public invoiceDate = this.fb.control({ value: '', disabled: true }, {
    validators: [],
    updateOn: 'blur'
  });
  public receiverUser = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public receivementDate = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public vehiclePlate = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public driverName = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public driverTelephone = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public notes = this.fb.control('', {
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
  public photos = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public attachments = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });

  @ViewChild('divergencesModal', { static: true }) divergencesModal: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('myInput', { static: true }) InputFile: ElementRef;
  @ViewChild(DivergenceModalComponent, { static: true }) divergenceModal: DivergenceModalComponent
  @ViewChild('labelImportPhotos', { static: false }) labelImportPhotos: ElementRef;
  @ViewChild('labelImportAttachments', { static: false }) labelImportAttachments: ElementRef;
  @ViewChild('labelImportInvoiceDoc', { static: false }) labelImportInvoiceDoc: ElementRef;

  constructor(private modalService: NgbModal,
    private comboService: ComboService,
    private fb: FormBuilder,
    public userService: UserService,
    private service: FormTransferBetweenInstallationsService,
    private serviceAlert: AlertService) {
    this.form = this.fb.group({
      stm: this.stm,
      transfer: this.transfer,
      emissionDate: this.emissionDate,
      transferStatus: this.transferStatus,
      requester: this.requester,
      approver: this.approver,
      sourceInstallation: this.sourceInstallation,
      sourceCnpj: this.sourceCnpj,
      targetInstallation: this.targetInstallation,
      targetCnpj: this.targetCnpj,
      invoiceEntrance: this.invoiceEntrance,
      invoiceNumber: this.invoiceNumber,
      invoiceDate: this.invoiceDate,
      receiverUser: this.receiverUser,
      receivementDate: this.receivementDate,
      vehiclePlate: this.vehiclePlate,
      driverName: this.driverName,
      driverTelephone: this.driverTelephone,
      emails: this.emails,
      notes: this.notes,
      photos: this.photos,
      attachments: this.attachments,
      invoiceTypeId: this.invoiceTypeId,
      receivementPhotos: this.receivementPhotos,
      additionalAttachments: this.additionalAttachments,
      invoiceDoc: this.invoiceDoc
    });
    this.transferNumber = sessionStorage.getItem('lastFormId');
    this.sendId = this.transferNumber
    this.service.fetchDetailsModal(this.transferNumber).subscribe(
      (response) => {
        this.data = response.data;
      });
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data
    });
  }

  ngOnInit() {
  }

  public fillUserCombo() {
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data;
    });
  }

  public maskTel = '(00) 0 0000-0000';
  public maskTelephone(telephone: string) {
    let telefone = this.form.get('driverTelephone').value;
    
    if (telefone.length > 10) {
      this.maskTel = '(00) 0 0000-0000'
    } else {
      this.maskTel = '(00) 0000-0000'
    }
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

  public invoiceDocHandler(uploadFiles: FileList) {
    this.invoiceDoc = uploadFiles

    this.labelImportInvoiceDoc.nativeElement.innerHTML = Array.from(this.invoiceDoc)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  public attachmentsHandler(uploadFiles: FileList) {
    this.additionalAttachments = uploadFiles

    this.labelImportAttachments.nativeElement.innerHTML = Array.from(this.additionalAttachments)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  public photosHandler(uploadFiles: FileList) {
    this.receivementPhotos = uploadFiles;

    this.labelImportPhotos.nativeElement.innerHTML = Array.from(this.receivementPhotos)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
    this.fileToUpload = this.receivementPhotos.item(0);
  }

  public reviewOrder() {
    this.service.fetchDetailsModal(this.transferNumber).subscribe(
      (response) => {
        this.data = response.data
      });
    const result = this.form.value;
    this.stmResult = this.data.stm;
    this.transferResult = this.data.transfer;

    this.emissionDateResult = this.data.emissionDate;
    this.transferStatusResult = this.data.status;
    this.requesterResult = this.data.requester;
    this.approverResult = this.data.approver;

    this.sourceInstallationResult = this.data.installationSource;
    this.sourceCnpjResult = "-";

    this.targetInstallationResult = this.data.installationDestiny;
    this.targetCnpjResult = "-";

    this.invoiceEntranceResult = "-";
    this.invoiceNumberResult = "-";
    this.invoiceDateResult = "-";

    this.shippingUserResult = 0;
    this.shippingDateResult = "-";
    this.deliveryForecastResult = "-";
    this.shippingdriverNameResult = "-";
    this.shippingVehiclePlateResult = "-";
    this.shippingDriverTelephoneResult = "-";

    this.receiverUserResult = this.getResponsibleId(result.receiverUser);
    this.receivementDateResult = this.newReceivementDate;
    this.receivementDriverNameResult = result.driverName;
    this.receivementVehiclePlateResult = result.vehiclePlate;
    this.receivementDriverTelephoneResult = result.driverTelephone;

    this.emailsResult = this.getEmails();
    this.commentsResult = result.notes;
    this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
  }

  public SaveData(result: any) {
    var formData: FormData = new FormData();
    formData.append('STMId', this.data.stm);
    // formData.append('UserWithdrawId', this.data.userWithdrawId);
    // formData.append('InvoiceNumber', this.data.invoiceNumber);
    // formData.append('InvoiceDate', this.data.invoiceDate);
    // formData.append('TransferStatusId', this.data.status);
    if (result.receiverUser) {
      formData.append('ReceiverUser', result.receiverUser);
    }
    formData.append('ReceivementDate', this.newReceivementDate);
    formData.append('VehiclePlate', result.vehiclePlate);
    formData.append('DriverName', result.driverName);
    formData.append('DriverNumber', result.driverTelephone);
    formData.append('Emails', this.getEmails());
    formData.append('Notes', result.notes);
    if (this.additionalAttachments != null) {
      for (this.index = 0; this.index < this.additionalAttachments.length; this.index++) {
        formData.append("Attachments", this.additionalAttachments[this.index]);
      }
    }
    if (this.invoiceDoc != null) {
      for (this.index = 0; this.index < this.invoiceDoc.length; this.index++) {
        formData.append("InvoiceDoc", this.invoiceDoc[this.index]);
      }
    }
    if (this.receivementPhotos != null) {
      for (this.index = 0; this.index < this.receivementPhotos.length; this.index++) {
        formData.append("Photos", this.receivementPhotos[this.index]);
      }
    }
    return formData;
  }

  public openDivergencesModal() {
    this.divergenceModal.show();
  }

  public saveAsDraft() {
    var request = this.SaveData(this.form.value);
    this.service.transferBetweenInstallationsDraft(request).subscribe((response) => {
      this.response = response;
      this.serviceAlert.success("Rascunho salvo com sucesso!", 3000);
    });
  }

  public SaveReceivement() {
    var request = this.SaveData(this.form.value);
    this.service.transferBetweenInstallations(request).subscribe((response) => {
      this.response = response;
      this.serviceAlert.success("Salvo com sucesso!", 3000);
    });
  }

}

