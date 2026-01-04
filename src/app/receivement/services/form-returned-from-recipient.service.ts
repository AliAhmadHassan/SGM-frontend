import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import BaseResponse from 'src/app/shared/models/baseResponse.model';


@Injectable({
  providedIn: 'root'
})
export class FormReturnedFromRecipientService {

  constructor(private http: HttpClient) { }

  public receivementDevolutionDraft(draftForm: FormData) {
    return this.http.post(environment.baseApiUrl + 'ReceivementDevolution/AsDraft', draftForm);
  }

}
