import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormDirectTemporaryCustodyService } from '../../services/form-direct-temporary-custody.service';
import { select, Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/auth/auth.selectors';
import { AuthState } from 'src/app/auth/auth.reducer';
import MaterialItemTemporaryCustody from '../../models/material-item-temporary-custody.model';

@Component({
  selector: 'app-form-direct-temporary-custody',
  templateUrl: './form-direct-temporary-custody.component.html',
  styleUrls: ['./form-direct-temporary-custody.component.scss']
})
export class FormDirectTemporaryCustodyComponent implements OnInit {

  @ViewChild('labelImportAttachments', { static: false }) labelImportAttachments: ElementRef;
  @ViewChild('labelImportRma', { static: false }) labelImportRma: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;

  public date = new Date();
  public user$ = this.storeAuth.pipe(select(selectAuthUser));
  public responsibles: any;
  public reasonCustody: any;
  public additionalAttachments: FileList;
  public rmaFile: FileList;
  public itemList: object[] = [new MaterialItemTemporaryCustody];
  public materials: any;
  public response: any;
  public newDeliveryDate: string = '';
  public stringEmailList: string = '';

  public receiverIdResult: number;
  public userDeliveryIdResult: number;
  public deliveryDateResult: string;
  public userWithdrawIdResult: number;
  public emailsResult: string;
  public notesResult: string;
  public installationSourceIdResult: string;

  public form: FormGroup;
  public receiverId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public userDeliveryId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public deliveryDate = this.fb.control('', {
    validators: [Validators.maxLength(300)],
    updateOn: 'blur'
  });
  public userWithdrawId = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public emails = this.fb.control([], {
    validators: [Validators.maxLength(250)],
    updateOn: 'blur'
  });
  public notes = this.fb.control('', {
    validators: [Validators.maxLength(300)],
    updateOn: 'blur'
  });
  public installationSourceId = this.fb.control(null, {
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
    private service: FormDirectTemporaryCustodyService,
    private alertService: AlertService,
    private storeAuth: Store<AuthState>) {
    this.form = this.fb.group({
      receiverId: this.receiverId,
      userDeliveryId: this.userDeliveryId,
      deliveryDate: this.deliveryDate,
      userWithdrawId: this.userWithdrawId,
      emails: this.emails,
      notes: this.notes,
      installationSourceId: this.installationSourceId,
      attachments: this.attachments,
    });
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data
    });
    this.comboService.fetchReasonProvisionGuide().subscribe(response => {
      this.reasonCustody = response.data
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

  public setDeliveryDate(date: string): void {
    if (date) {
      this.form.value.deliveryDate = date;
      this.newDeliveryDate = this.form.value.deliveryDate;
    }
  }

  public fillUserCombo() {
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data;
    });
  }

  public fillReasonCustodyCombo() {
    this.comboService.fetchReasonProvisionGuide().subscribe(response => {
      this.reasonCustody = response.data
    });
  }

  public attachmentsHandler(uploadFiles: FileList) {
    this.additionalAttachments = uploadFiles

    this.labelImportAttachments.nativeElement.innerHTML = Array.from(this.additionalAttachments)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  public rmaHandler(uploadFiles: FileList) {
    this.rmaFile = uploadFiles

    this.labelImportRma.nativeElement.innerHTML = Array.from(this.rmaFile)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  public addNewItem(): void {
    this.itemList.push(new MaterialItemTemporaryCustody);
  }

  public setQuantity(event: any, index: number): void {
    this.itemList[index]['amount'] = event.target.value;
  }

  public setReasonCustody(event: any, index: number): void {
    this.itemList[index]['disciplineId'] = event.id;
  }

  public setMaterial(event, index) {
    if (event) {
      this.itemList[index]['materialCode'] = event.code;
      this.itemList[index]['description'] = event.description;
      this.itemList[index]['unity'] = event.unity;
    }
    else {
      this.itemList[index] = new MaterialItemTemporaryCustody;
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

  public reviewOrder() {
    const result = this.form.value;
    this.userDeliveryIdResult = this.getUserDeliveryById(result.userDeliveryId);
    this.deliveryDateResult = this.newDeliveryDate;
    this.userWithdrawIdResult = this.getUserWithdrawById(result.userWithdrawId);
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
    formData.append('Emails', this.getEmails());
    formData.append('Notes', result.notes);
    // TODO -> Pegar o Id da Instalação do usuário
    formData.append('InstallationIdSource', '73');

    if (this.additionalAttachments != null) {
      for (let i = 0; i < this.additionalAttachments.length; i++) {
        formData.append("Attachments", this.additionalAttachments[i]);
      }
    }
    return formData;
  }

  public saveAsDraft() {
    var request = this.SaveData(this.form.value);
    this.service.outputTemporaryCustodyDraft(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Rascunho salvo com sucesso!", 3000);
    });
  }

  public SaveReceivement() {
    var request = this.SaveData(this.form.value);
    this.service.outputTemporaryCustody(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Salvo com sucesso!", 3000);
    });
  }

}
