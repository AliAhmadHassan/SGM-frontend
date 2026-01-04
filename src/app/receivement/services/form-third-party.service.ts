import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import BaseResponse from 'src/app/shared/models/baseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class FormThirdPartyService {

  constructor(private http: HttpClient) { }

  public receivementThirdPartyDraft(draftForm: FormData) {
    return this.http.post(environment.baseApiUrl + 'ReceivementThirdParty/AsDraft', draftForm);
  }

  public receivementThirdParty(finalForm: FormData) {
    return this.http.post(environment.baseApiUrl + 'ReceivementThirdParty', finalForm);
  }
}
