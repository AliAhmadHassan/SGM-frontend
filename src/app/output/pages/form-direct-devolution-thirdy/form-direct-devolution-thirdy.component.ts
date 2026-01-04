import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormDirectDevolutionThirdyService } from '../../services/form-direct-devolution-thirdy.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/auth/auth.reducer';
import { selectAuthUser } from 'src/app/auth/auth.selectors';
import MaterialItemDevolutionThirdy from '../../models/material-item-devolution-thirdy.model';

@Component({
  selector: 'app-form-direct-devolution-thirdy',
  templateUrl: './form-direct-devolution-thirdy.component.html',
  styleUrls: ['./form-direct-devolution-thirdy.component.scss']
})
export class FormDirectDevolutionThirdyComponent implements OnInit {

  @ViewChild('labelImportPhotos', {static: false}) labelImportPhotos: ElementRef;
  @ViewChild('labelImportAttachments', { static: false }) labelImportAttachments: ElementRef;
  @ViewChild('labelImportInvoice', {static: false}) labelImportInvoice: ElementRef;
  @ViewChild('labelImportReturnAuthorization', { static: false }) labelImportReturnAuthorization: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;

  public date = new Date();
  public user$ = this.storeAuth.pipe(select(selectAuthUser));
  public responsibles: any;
  public receivers: any;
  public additionalAttachments: FileList;
  public shippingPhotos: FileList;
  public invoiceFile: FileList;
  public returnAuthorizationFile: FileList;
  public itemList: object[] = [new MaterialItemDevolutionThirdy];
  public materials: any;
  public response: any;
  public newDeliveryDate: string = '';
  public stringEmailList: string = '';
  public fileToUpload: File = null;

  public receiverIdResult: number;
  public userDeliveryIdResult: number;
  public deliveryDateResult: string;
  public userWithdrawIdResult: number;
  public vehiclePlateResult: string;
  public driverNameResult: string;
  public driverNumberResult: string;
  public emailsResult: string;
  public notesResult: string;
  public installationIdSourceResult: number;

  public form: FormGroup;
  public receiverId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public userDeliveryId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public resposableId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public deliveryDate = this.fb.control('', {
    validators: [Validators.maxLength(10)],
    updateOn: 'blur'
  });
  public userWithdrawId = this.fb.control('', {
    validators: [],
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
  public emails = this.fb.control([], {
    validators: [Validators.maxLength(250)],
    updateOn: 'blur'
  });
  public notes = this.fb.control('', {
    validators: [Validators.maxLength(300)],
    updateOn: 'blur'
  });
  public installationIdSource = this.fb.control(null, {
    validators: [],
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

  constructor(private modalService: NgbModal,
    private comboService: ComboService,
    private fb: FormBuilder,
    public userService: UserService,
    private service: FormDirectDevolutionThirdyService,
    private alertService: AlertService,
    private storeAuth: Store<AuthState>) {
    this.form = this.fb.group({
      receiverId: this.receiverId,
      userDeliveryId: this.userDeliveryId,
      deliveryDate: this.deliveryDate,
      userWithdrawId: this.userWithdrawId,
      vehiclePlate: this.vehiclePlate,
      driverName: this.driverName,
      driverNumber: this.driverNumber,
      emails: this.emails,
      notes: this.notes,
      installationIdSource: this.installationIdSource,
      photos: this.photos,
      attachments: this.attachments,
    });
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data
    });
    this.comboService.fetchReceiver().subscribe(response => {
      this.receivers = response.data
    });
  }

  ngOnInit() {
    this.customSearchFn();
  }

  private getUserDeliveryById(userDelivery: string): number {
    if (userDelivery) {
      return this.responsibles.find(responsible => responsible.id == userDelivery)['text'];
    }
    return null;
  }

  private getUserWithdrawById(userWithdrawId: string): number {
    if (userWithdrawId) {
      return this.responsibles.find(responsible => responsible.id == userWithdrawId)['text'];
    }
    return null;
  }

  public fillUserCombo() {
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data;
    });
  }

  public fillReceiversCombo() {
    this.comboService.fetchReceiver().subscribe(response => {
      this.receivers = response.data;
    });
  }

  public invoiceHandler(uploadFiles: FileList) {
    this.invoiceFile = uploadFiles
    this.labelImportInvoice.nativeElement.innerHTML = Array.from(this.invoiceFile)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  public returnAuthorizationHandler(uploadFiles: FileList) {
    this.returnAuthorizationFile = uploadFiles
    this.labelImportReturnAuthorization.nativeElement.innerHTML = Array.from(this.returnAuthorizationFile)
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
    this.shippingPhotos = uploadFiles;

    this.labelImportPhotos.nativeElement.innerHTML = Array.from(this.shippingPhotos)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
    this.fileToUpload = this.shippingPhotos.item(0);
  }

  public addNewItem(): void {
    this.itemList.push(new MaterialItemDevolutionThirdy);
  }

  public setQuantity(event: any, index: number): void {
    this.itemList[index]['amount'] = event.target.value;
  }

  public setMaterial(event, index) {
    if (event) {
      this.itemList[index]['materialCode'] = event.code;
      this.itemList[index]['description'] = event.description;
      this.itemList[index]['unity'] = event.unity;
    }
    else {
      this.itemList[index] = new MaterialItemDevolutionThirdy;
    }
  }

  public getMaterials(value = '') {
    let filters = { code: value.toString() };
    this.comboService.fetchMaterialWithoutOrder(filters).subscribe(response => {
      this.materials = response.data;
    });
  }

  public customSearchFn(event: any = '') {
    this.getMaterials(event.term);
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

  public setDeliveryDate(date: string): void {
    if (date) {
      this.form.value.deliveryDate = date;
      this.newDeliveryDate = this.form.value.deliveryDate;
    }
  }

  public reviewOrder() {
    const result = this.form.value;
    this.userDeliveryIdResult = this.getUserDeliveryById(result.userDeliveryId);
    this.deliveryDateResult = this.newDeliveryDate;
    this.userWithdrawIdResult = this.getUserWithdrawById(result.userWithdrawId);
    this.vehiclePlateResult = result.vehiclePlate;
    this.driverNameResult = result.driverName;
    this.driverNumberResult = result.driverNumber;
    this.emailsResult = this.getEmails();
    this.notesResult = result.notes;
    this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
  }

  public SaveData(result: any) {
    var formData: FormData = new FormData();
    formData.append('ReceiverId', result.receiverId);
    formData.append('MaterialCodesAmount', JSON.stringify(this.itemList));
    formData.append('UserDeliveryId', result.userDeliveryId);
    formData.append('DeliveryDate', this.newDeliveryDate);
    formData.append('UserWithdrawId', result.userWithdrawId);
    formData.append('VehiclePlate', result.vehiclePlate);
    formData.append('DriverName', result.driverName);
    formData.append('DriverNumber', result.driverNumber);
    formData.append('Notes', result.notes);
    formData.append('Emails', this.getEmails());
    // TODO -> Pegar o Id da Instalação do usuário
    formData.append('InstallationIdSource', '73');

    if (this.returnAuthorizationFile != null) {
      for (let i = 0; i < this.returnAuthorizationFile.length; i++) {
        formData.append("Attachments", this.returnAuthorizationFile[i]);
      }
    }
    if (this.invoiceFile != null) {
      for (let i = 0; i < this.invoiceFile.length; i++) {
        formData.append("Attachments", this.invoiceFile[i]);
      }
    }
    if (this.additionalAttachments != null) {
      for (let i = 0; i < this.additionalAttachments.length; i++) {
        formData.append("Attachments", this.additionalAttachments[i]);
      }
    }
    if (this.shippingPhotos != null) {
      for (let i = 0; i < this.shippingPhotos.length; i++) {
        formData.append("Photos", this.shippingPhotos[i]);
      }
    }
    return formData;
  }

  public saveAsDraft() {
    var request = this.SaveData(this.form.value);
    this.service.outputThirdPartyDraft(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Rascunho salvo com sucesso!", 3000);
    });
  }

  public SaveReceivement() {
    var request = this.SaveData(this.form.value);
    this.service.outputThirdParty(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Salvo com sucesso!", 3000);
    });
  }

}
