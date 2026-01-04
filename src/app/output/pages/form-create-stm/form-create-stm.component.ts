import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import MaterialItem from '../../models/material-item.model';
import { FormCreateStmService } from '../../services/form-create-stm.service';
import { InstallationService } from 'src/app/administration/services/installation.service';
import { switchMap } from 'rxjs/operators';
import InstallationWithAddressCombo from '../../models/installation-with-address-combo.model';
import MaterialStmItem from '../../models/material-stm-item.model';
@Component({
  selector: 'app-form-create-stm',
  templateUrl: './form-create-stm.component.html',
  styleUrls: ['./form-create-stm.component.scss']
})
export class FormCreateStmComponent implements OnInit {

  @ViewChild('labelImportAttachments', { static: false }) labelImportAttachments: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;

  public date = new Date();
  public users: any;
  public installations: any;
  public installationsAddress: any;
  public additionalAttachments: FileList;
  public itemList: object[] = [new MaterialItem];
  public materialStmList: object[] = [new MaterialStmItem];
  public materials: any;
  public disciplines: any;
  public response: any;

  public installationResult: number;s
  public resposableResult: number;
  public commentsResult: string;
  public userRequestResult: number;
  public installationSourceResult;
  public installationDestinyResult;
  public stringEmailList: string = '';
  public emailsResult: string;
  public form: FormGroup;

  public userRequestId = this.fb.control('', {
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
  public comments = this.fb.control('', {
    validators: [Validators.maxLength(300)],
    updateOn: 'blur'
  });
  public files = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });

  constructor(private modalService: NgbModal,
    private comboService: ComboService,
    private fb: FormBuilder,
    public userService: UserService,
    private service: FormCreateStmService,
    private alertService: AlertService,
    private installationService: InstallationService) {
    this.form = this.fb.group({
      userRequestId: this.userRequestId,
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

  public setInstallationSource(installationId): void {
    this.installationSourceResult = this.getInstallation(installationId);
  }

  public setInstallationDestiny(installationId): void {
    this.installationDestinyResult = this.getInstallation(installationId);
  }

  private getResponsibleId(receiverUser: string): number {
    if (receiverUser) {
      return this.users.find(responsible => responsible.id == receiverUser)['text'];
    }
    return null;
  }


  public getInstallation(installationId: number) {
    var installation: InstallationWithAddressCombo = new InstallationWithAddressCombo;

    if(installationId){
      this.installationService
        .getInstallation(installationId)
        .pipe(
          switchMap(response => {
            installation.name = response.data.name;
            installation.address = response.data.address;
            installation.city = response.data.city;
            installation.uf = response.data.uf;
            return installation.name;
          })
        )
        .subscribe();
      return installation;
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

  attachmentsHandler(uploadFiles: FileList) {
    this.additionalAttachments = uploadFiles

    this.labelImportAttachments.nativeElement.innerHTML = Array.from(this.additionalAttachments)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');
  }

  public addNewItem(): void {
    this.itemList.push(new MaterialItem);
    this.materialStmList.push(new MaterialStmItem);
  }

  public setUnityPrice(event: any, index: number): void {
    this.itemList[index]['unityPrice'] = event.target.value;
  }

  public setQuantity(event: any, index: number): void {
    this.itemList[index]['amountReceived'] = event.target.value;
    this.materialStmList[index]['amount'] = event.target.value;
  }

  public setSubject(event: any, index: number): void {
    this.itemList[index]['disciplineId'] = event.id;
  }

  public setMaterial(event, index) {
    if (event) {
      this.itemList[index]['materialCode'] = event.code;
      this.materialStmList[index]['materialCode'] = event.code;
      this.itemList[index]['description'] = event.description;
      this.itemList[index]['unity'] = event.unity;
    }
    else {
      this.itemList[index] = new MaterialItem;
      this.materialStmList[index] = new MaterialItem;
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
    this.userRequestResult = this.getResponsibleId(result.userRequestId);
    this.resposableResult = this.getResponsibleId(result.userWithdrawId);
    this.emailsResult = this.getEmails();
    this.commentsResult = result.comments;
    this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
  }

  public SaveData(result: any) {
    var formData: FormData = new FormData();
    formData.append('STMStatusId', '1');
    formData.append('UserRequestId', result.userRequestId);
    formData.append('InstallationSourceId', result.installationSourceId);
    formData.append('InstallationDestinyId', result.installationDestinyId);
    formData.append('UserWithdrawId', result.userWithdrawId);
    formData.append('MaterialCodesAmount', JSON.stringify(this.materialStmList));
    formData.append('Emails', this.getEmails());
    formData.append('Notes', result.comments);

    if (this.additionalAttachments != null) {
      for (let i = 0; i < this.additionalAttachments.length; i++) {
        formData.append("Attachments", this.additionalAttachments[i]);
      }
    }
    return formData;
  }

  public createStm() {
    var request = this.SaveData(this.form.value);
    this.service.createStm(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Finalizado com sucesso!", 3000);
    });
  }

  public saveAsDraft() {
    var request = this.SaveData(this.form.value);
    this.service.createStmDraft(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Rascunho salvo com sucesso!", 3000);
    });
  }

}
