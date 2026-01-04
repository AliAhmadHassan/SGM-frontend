import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { DivergenceModalComponent } from '../../components/divergence-modal/divergence-modal.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormThirdPartyService } from '../../services/form-third-party.service';
import MaterialItem from '../../models/material-item.model';
import { FormWithInvoiceAndWithoutOrderService } from '../../services/form-with-invoice-and-without-order.service';
import { AuthState } from 'src/app/auth/auth.reducer';
import { Store, select } from '@ngrx/store';
import { selectAuthUser } from 'src/app/auth/auth.selectors';
import { selectInstallation } from 'src/app/shared/shared.selectors';

@Component({
  selector: 'app-form-third-party',
  templateUrl: './form-third-party.component.html',
  styleUrls: ['./form-third-party.component.scss']
})
export class FormThirdPartyComponent implements OnInit {

  @ViewChild(DivergenceModalComponent, { static: true }) divergenceModal: DivergenceModalComponent
  @ViewChild('divergencesModal', { static: true }) divergencesModal: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;
  @ViewChild('genericPage', { static: true }) genericPage: any;
  @ViewChild('myInput', { static: true }) InputFile: ElementRef;
  @ViewChild('labelImportPhotos', {static: false}) labelImportPhotos: ElementRef;
  @ViewChild('labelImportAttachments', {static: false}) labelImportAttachments: ElementRef;

  public date = new Date();
  public user$ = this.storeAuth.pipe(select(selectAuthUser));
  public installation$ = this.storeAuth.pipe(select(selectInstallation));
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
  public response: any
  public materials: any;
  public stringEmailList: string = '';

  public newReceivementDate: string = '';
  public newDocumentDate: string = '';

  public complementResult: string;
  public documentDateResult: string;
  public documentNumberResult: string;
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
  public files: FileList;
  public fileToUpload: File = null;

  public form: FormGroup;
  public provider = this.fb.control(null, {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public complement = this.fb.control('', {
    validators: [Validators.maxLength(100)],
    updateOn: 'blur'
  });
  public documentDate = this.fb.control('', {
    validators: [Validators.maxLength(10)],
    updateOn: 'blur'
  });
  public documentNumber = this.fb.control('', {
    validators: [Validators.maxLength(10)],
    updateOn: 'blur'
  });
  public installationId = this.fb.control('', {
    validators: [Validators.maxLength(10)],
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
  public driverTelephone = '';
  public comments = this.fb.control('', {
    validators: [Validators.maxLength(300)],
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
  public materialWithoutOrder = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public attachments = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });

  constructor(private modalService: NgbModal,
    private storeAuth: Store<AuthState>,
    private comboService: ComboService,
    private fb: FormBuilder,
    public userService: UserService,
    private service: FormThirdPartyService,
    private alertService: AlertService,
    private provideService: FormWithInvoiceAndWithoutOrderService,) {
      this.form = this.fb.group({
        provider: this.provider,
        complement: this.complement,
        documentDate: this.documentDate,
        documentNumber: this.documentNumber,
        installationId: this.installationId,
        receiverUser: this.receiverUser,
        receivementDate: this.receivementDate,
        vehiclePlate: this.vehiclePlate,
        driverName: this.driverName,
        driverTelephone: this.driverTelephone,
        comments: this.comments,
        invoiceTypeId: this.invoiceTypeId,
        emails: this.emails,
        photos: this.photos,
        materialWithoutOrder: this.materialWithoutOrder,
        attachments: this.attachments
      });
      this.comboService.fetchResponsible().subscribe(response => {
        this.responsibles = response.data
      });
      this.provideService.comboProviders().subscribe(response => {
        this.providers = response.data;
      });
    }

  ngOnInit() {
    this.customSearchFn();
  }

  public openDivergencesModal(): void {
    this.divergenceModal.show();
  }

  public fillUserCombo() {
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data;
    });
  }

  public fillProvidersCombo() {
    this.provideService.comboProviders().subscribe(resp => {
      this.providers = resp.data;
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

  public setDocumentDate(date: string): void {
    if (date) {
      this.form.value.documentDate = date;
      this.newDocumentDate = this.form.value.documentDate;
    }
  }

  public setReceivementDate(date: string): void {
    if (date) {
      this.form.value.receivementDate = date;
      this.newReceivementDate = this.form.value.receivementDate;
    }
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

  attachmentsHandler(uploadFiles: FileList) {
    this.additionalAttachments = uploadFiles

    this.labelImportAttachments.nativeElement.innerHTML = Array.from(this.additionalAttachments)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  photosHandler(uploadFiles: FileList) {
    this.receivementPhotos = uploadFiles;

    this.labelImportPhotos.nativeElement.innerHTML = Array.from(this.receivementPhotos)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
    this.fileToUpload = this.receivementPhotos.item(0);
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

  private formatEmailList(emailList: string): string {
    return emailList.slice(0, this.stringEmailList.length - 2);
  }

  private getEmailString(){
    let emailList = this.emails.value;
    let stringList: string = '';
    for(let i = 0 ; i < emailList.length ; i++){
      stringList += emailList[i].label + ', ';
    }
    return stringList;
  }

  private getEmails(){
    return this.formatEmailList(this.getEmailString());
  }

  public reviewOrder() {
    const result = this.form.value;
    this.complementResult = result.complement;
    this.documentDateResult = this.newDocumentDate;
    this.documentNumberResult = result.documentNumber;
    this.receiverUserResult = this.getResponsibleId(result.receiverUser);
    this.receivementDateResult = this.newReceivementDate;
    this.vehiclePlateResult = result.vehiclePlate;
    this.driverNameResult = result.driverName;
    this.driverTelephoneResult = result.driverTelephone;
    this.commentsResult = result.comments;
    this.emailsResult = this.getEmails();
    this.providerResult = this.getProviderId(result.provider);
    this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
  }

  public SaveData(result: any) {

    var formData: FormData = new FormData();
    formData.append('Complement', result.complement);
    formData.append('DocumentDate', this.newDocumentDate);
    formData.append('DocumentNumber', result.documentNumber);

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
    formData.append('MaterialWithoutOrder', JSON.stringify(this.itemList));

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
    this.service.receivementThirdPartyDraft(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Rascunho salvo com sucesso!", 3000);
    });
  }

  public SaveReceivement() {
    var request = this.SaveData(this.form.value);
    this.service.receivementThirdParty(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Salvo com sucesso!", 3000);
    });
  }

}
