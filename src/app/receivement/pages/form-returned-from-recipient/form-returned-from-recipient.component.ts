import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormReturnedFromRecipientService } from '../../services/form-returned-from-recipient.service';
import MaterialItemDevolution from '../../models/material-item.devolution.model';

@Component({
  selector: 'app-form-returned-from-recipient',
  templateUrl: './form-returned-from-recipient.component.html',
  styleUrls: ['./form-returned-from-recipient.component.scss']
})
export class FormReturnedFromRecipientComponent implements OnInit {

  @ViewChild('labelImportAttachments', {static: false}) labelImportAttachments: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;

  public date = new Date();
  public responsibles: any;
  public additionalAttachments: FileList;
  public itemList: object[] = [new MaterialItemDevolution];
  public materials: any;
  public statusList: any;
  public reasons: any;
  public response: any;
  public stringEmailList: string = '';

  public userResponsableResult: number;
  public emailsResult: string;
  public notesResult: string;
  public dateResult: string;

  public form: FormGroup;
  public userResponsableId = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public receivementDate = this.fb.control('', {
    validators: [],
    updateOn: 'blur'
  });
  public directExitReceiverId = this.fb.control(null, {
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
  public attachments = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });

  constructor(private modalService: NgbModal,
    private comboService: ComboService,
    private fb: FormBuilder,
    public userService: UserService,
    private service: FormReturnedFromRecipientService,
    private alertService: AlertService) {
      this.form = this.fb.group({
        userResponsableId: this.userResponsableId,
        receivementDate: this.receivementDate,
        directExitReceiverId: this.directExitReceiverId,
        emails: this.emails,
        notes: this.notes,
        attachments: this.attachments
      });
      this.comboService.fetchResponsible().subscribe(response => {
        this.responsibles = response.data
      });
      this.comboService.fetchMaterialStatus().subscribe(response => {
        this.statusList = response.data
      });
    }

    ngOnInit() {
      this.customSearchFn();
    }

    private getResponsibleById(receiverUser: string): number {
      if (receiverUser) {
        return this.responsibles.find(responsible => responsible.id == receiverUser)['text'];
      }
      return null;
    }

    public fillUserCombo() {
      this.comboService.fetchResponsible().subscribe(response => {
        this.responsibles = response.data;
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

    public addNewItem(): void {
      this.itemList.push(new MaterialItemDevolution);
    }

    public setQuantity(event: any, index: number): void {
      this.itemList[index]['amount'] = event.target.value;
    }

    public setMaterialStatus(event: any, index: number): void {
      this.itemList[index]['materialStatusId'] = event.text;
    }

    public setReasons(event: any, index: number): void {
      this.itemList[index]['devolutionReasonId'] = event.text;
    }

    public setAdditionalControl(event: any, index: number): void {
      this.itemList[index]['additionalController'] = event.target.value;
    }

    public setMaterial(event, index) {
      if(event){
        this.itemList[index]['materialCode'] = event.code;
        this.itemList[index]['description'] = event.description;
        this.itemList[index]['unity'] = event.unity;
      }
      else{
        this.itemList[index] = new MaterialItemDevolution;
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

    private getFormattedDate(){
      let year = this.date.getUTCFullYear();
      let month = this.date.getUTCMonth();
      let day = this.date.getUTCDate();
      return this.dateResult = (year + "-" + (month + 1) + "-" + day)
    }

    public reviewOrder() {
      console.log(this.itemList)
      const result = this.form.value;
      this.userResponsableResult = this.getResponsibleById(result.userResponsableId);
      this.emailsResult = this.getEmails();
      this.notesResult = result.comments;
      this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
    }

    public SaveData(result: any) {
      var formData: FormData = new FormData();
      formData.append('UserResponsableId', result.userResponsableId);
      formData.append('ReceivementDate', this.getFormattedDate());
      // formData.append('DirectExitReceiverId   ', result.directExitReceiverId);
      formData.append('DirectExitReceiverId', '34');
      formData.append('Emails', this.getEmails());
      formData.append('Notes', result.notes);
      formData.append('ReceivementDevolutionMaterials', JSON.stringify(this.itemList));

      if (this.additionalAttachments != null) {
        for (let i = 0; i < this.additionalAttachments.length; i++) {
          formData.append("Attachments", this.additionalAttachments[i]);
        }
      }
      return formData;
    }

    public saveAsDraft() {
      debugger
      var request = this.SaveData(this.form.value);
      this.service.receivementDevolutionDraft(request).subscribe((response) => {
        this.response = response;
        this.alertService.success("Rascunho salvo com sucesso!", 3000);
      });
    }

}
