import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/shared/services/combo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/administration/services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormCreateRmaService } from '../../services/form-create-rma.service';
import MaterialItem from '../../models/material-item.model';

@Component({
  selector: 'app-form-create-rma',
  templateUrl: './form-create-rma.component.html',
  styleUrls: ['./form-create-rma.component.scss']
})
export class FormCreateRmaComponent implements OnInit {

  @ViewChild('labelImportAttachments', {static: false}) labelImportAttachments: ElementRef;
  @ViewChild('finalDetailsModal', { static: true }) finalDetailsModal: ElementRef;

  public responsibles: any;
  public installations: any;
  public additionalAttachments: FileList;
  public itemList: object[] = [new MaterialItem];
  public materials: any;
  public disciplines: any;
  public response: any;

  public installationResult: number;
  public resposableResult: number;
  public commentsResult: string;

  public form: FormGroup;
  public installationId = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public resposableId = this.fb.control(null, {
    validators: [],
    updateOn: 'blur'
  });
  public receiverId = this.fb.control(null, {
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
    private service: FormCreateRmaService,
    private alertService: AlertService) {
    this.form = this.fb.group({
      installationId: this.installationId,
      resposableId: this.resposableId,
      receiverId: this.receiverId,
      comments: this.comments,
      files: this.files
    });
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data
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

  private getResponsibleById(receiverUser: string): number {
    if (receiverUser) {
      return this.responsibles.find(responsible => responsible.id == receiverUser)['text'];
    }
    return null;
  }

  private getInstallationById(installationResult: string): number {
    if (installationResult) {
      return this.installations.find(installation => installation.id == installationResult)['text'];
    }
    return null;
  }

  public fillUserCombo() {
    this.comboService.fetchResponsible().subscribe(response => {
      this.responsibles = response.data;
    });
  }

  public fillInstallationsCombo() {
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
  }

  public setUnityPrice(event: any, index: number): void {
    this.itemList[index]['unityPrice'] = event.target.value;
  }

  public setQuantity(event: any, index: number): void {
    this.itemList[index]['amountReceived'] = event.target.value;
  }

  public setSubject(event: any, index: number): void {
    this.itemList[index]['disciplineId'] = event.id;
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
    this.installationResult = this.getInstallationById(result.installationId);
    this.resposableResult = this.getResponsibleById(result.resposableId);
    this.commentsResult = result.comments;
    this.modalService.open(this.finalDetailsModal, { size: 'xl', backdrop: 'static' })
  }

  public SaveData(result: any) {
    var formData: FormData = new FormData();
    formData.append('InstallationId', result.installationId);
    formData.append('ResponsableId', result.resposableId);
    // TODO -> Pegar o ReceiverId
    formData.append('ReceiverId', '34');
    formData.append('Comments', result.comments);
    formData.append('Materials', JSON.stringify(this.itemList));

    if (this.additionalAttachments != null) {
      for (let i = 0; i < this.additionalAttachments.length; i++) {
        formData.append("Attachments", this.additionalAttachments[i]);
      }
    }
    return formData;
  }

  public createRma() {
    var request = this.SaveData(this.form.value);
    this.service.createRma(request).subscribe((response) => {
      this.response = response;
      this.alertService.success("Rascunho salvo com sucesso!", 3000);
    });
  }

}
