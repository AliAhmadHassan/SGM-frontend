import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InstallationService } from 'src/app/administration/services/installation.service';
import { select, Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/auth/auth.selectors';
import { AuthState } from 'src/app/auth/auth.reducer';
import { FormOutputReceiverService } from '../../services/form-output-receiver.service';
import MaterialOutputReceiverItem from '../../models/material-output-receiver-item.model';

@Component({
  selector: 'app-form-output-receiver',
  templateUrl: './form-output-receiver.component.html',
  styleUrls: ['./form-output-receiver.component.scss']
})
export class FormOutputReceiverComponent implements OnInit {

  @ViewChild('labelImportAttachments', { static: false }) labelImportAttachments: ElementRef;
  @ViewChild('labelImportPhotos', {static: false}) labelImportPhotos: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;

  public date = new Date();
  public deliveryDate: string = '';
  public users: any;
  public installations: any;
  public installationsAddress: any;
  public additionalAttachments: FileList;
  public receivementPhotos: FileList;
  public fileToUpload: File = null;
  public itemList: object[] = [new MaterialOutputReceiverItem];
  public materials: any;
  public disciplines: any;
  public response: any;
  public receiverTypes: any;
  public receiverCodes: any;
  public installation: any;

  public installationResult: number;
  public resposableResult: number;
  public commentsResult: string;
  public userDeliveryResult: number;
  public userWithdrawResult: number;
  public installationSourceResult: number;
  public installationDestinyResult: number;
  public receiverCodeResult: string;
  public receiverTypeResult: number;
  public stringEmailList: string = '';
  public emailsResult: string;
  public user$ = this.storeAuth.pipe(select(selectAuthUser));
  public form: FormGroup;

  public userDeliveryId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public emails = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public installationSourceId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public installationDestinyId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public userWithdrawId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });

  public receiverCodeId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });

  public receiverTypeId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public comments = this.fb.control('', {
    validators: [Validators.maxLength(300)],
    updateOn: 'blur'
  });
  public files = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });

  constructor(
    private storeAuth: Store<AuthState>,
    private modalService: NgbModal,
    private comboService: ComboService,
    private fb: FormBuilder,
    public userService: UserService,
    private service: FormOutputReceiverService,
    private alertService: AlertService,
    private installationService: InstallationService) {
    this.form = this.fb.group({
      receiverCodeId: this.receiverCodeId,
      receiverTypeId: this.receiverTypeId,
      userDeliveryId: this.userDeliveryId,
      installationSourceId: this.installationSourceId,
      installationDestinyId: this.installationDestinyId,
      userWithdrawId: this.userWithdrawId,
      emails: this.emails,
      comments: this.comments,
      files: this.files
    });
    this.comboService.fetchResponsible().subscribe(response => {
      this.users = response.data
    });
    this.comboService.fetchInstallation().subscribe(response => {
      this.installations = response.data
    });
    this.comboService.fetchDiscipline().subscribe(response => {
      this.disciplines = response.data
    });
    this.comboService.fetchReceiverType().subscribe(response => {
      this.receiverTypes = response.data
    });
    this.comboService.fetchReceiverCode().subscribe(response => {
      this.receiverCodes = response.data
    });
  }

  ngOnInit() {
    this.customSearchFn();
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

  public fillInstallationSource(installationId): void {
    this.installationSourceResult = this.getInstallation(installationId);
  }

  public fillInstallationDestiny(installationId): void {
    this.installationDestinyResult = this.getInstallation(installationId);
  }

  private getReceiverCodeById(receiverCodeId: string): number {
    if (receiverCodeId) {
      return this.receiverTypes.find(responsible => responsible.id == receiverCodeId)['text'];
    }
    return null;
  }

  private getReceiverTypeById(receiverTypeId: string): number {
    if (receiverTypeId) {
      return this.receiverTypes.find(responsible => responsible.id == receiverTypeId)['text'];
    }
    return null;
  }

  private getResponsibleId(receiverUser: string): number {
    if (receiverUser) {
      return this.users.find(responsible => responsible.id == receiverUser)['text'];
    }
    return null;
  }

  public getInstallation(installationId: number) {
    if(installationId){
      this.installationService.getInstallation(installationId).subscribe(response => this.installation = response.data);
      return this.installation;
    }
    return null;
  }

  public fillUserCombo(): void {
    this.comboService.fetchResponsible().subscribe(response => {
      this.users = response.data;
    });
  }

  public fillInstallationsCombo(): void {
    this.comboService.fetchInstallation().subscribe(response => {
      this.installations = response.data;
    });
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

  attachmentsHandler(uploadFiles: FileList) {
    this.additionalAttachments = uploadFiles

    this.labelImportAttachments.nativeElement.innerHTML = Array.from(this.additionalAttachments)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  public addNewItem(): void {
    this.itemList.push(new MaterialOutputReceiverItem);
  }

  public setQuantity(event: any, index: number): void {
    this.itemList[index]['amount'] = event.target.value;
  }

  public setDiscipline(event: any, index: number): void {
    this.itemList[index]['disciplineId'] = event.id;
    this.itemList[index]['disciplineText'] = event.text;
  }

  public setMaterial(event, index) {
    if (event) {
      this.itemList[index]['materialCode'] = event.code;
      this.itemList[index]['description'] = event.description;
      this.itemList[index]['unity'] = event.unity;
    }
    else {
      this.itemList[index] = new MaterialOutputReceiverItem;
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

  public reviewOrder() {
    const result = this.form.value;
    this.receiverCodeResult = result.receiverCodeId;
    this.receiverTypeResult = this.getReceiverTypeById(result.receiverTypeId);
    this.installationSourceResult = this.getInstallation(this.installationSourceId.value);
    this.installationDestinyResult = this.getInstallation(this.installationDestinyId.value);
    this.userDeliveryResult = this.getResponsibleId(result.userDeliveryId);
    this.userWithdrawResult = this.getResponsibleId(result.userWithdrawId);
    this.emailsResult = this.getEmails();
    this.commentsResult = result.comments;
    this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
  }

  public SaveData(result: any) {
    var formData: FormData = new FormData();

    formData.append('UserDeliveryId', result.userDeliveryId);
    formData.append('ReceiverId', result.userWithdrawId);
    formData.append('DeliveryDate', this.deliveryDate);
    // formData.append('InstallationSourceId', result.installationSourceId);
    // formData.append('InstallationDestinyId', result.installationDestinyId);

    formData.append('MaterialCodesAmount', JSON.stringify(this.itemList));
    formData.append('Emails', this.getEmails());
    formData.append('Notes', result.comments);

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

  public createOutputReceiver() {
    var request = this.SaveData(this.form.value);
    this.service.createOutputReceiver(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Rascunho salvo com sucesso!", 3000);
    });
  }

  public saveAsDraft() {
    var request = this.SaveData(this.form.value);
    this.service.createOutputReceiverDraft(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Rascunho salvo com sucesso!", 3000);
    });
  }
}
