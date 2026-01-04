import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormDirectDevolutionThirdyService {

  constructor(private http: HttpClient) { }

  public outputThirdParty(outputThirdParty: FormData) {
    return this.http.post(environment.baseApiUrl + 'DirectExitDevolutionThirdy', outputThirdParty);
  }

  public outputThirdPartyDraft(outputThirdPartyDraft: FormData) {
    return this.http.post(environment.baseApiUrl + 'DirectExitDevolutionThirdy/asDraft', outputThirdPartyDraft);
  }
}
