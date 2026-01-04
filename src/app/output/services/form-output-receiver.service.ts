import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormOutputReceiverService {

  constructor(private http: HttpClient) { }

  public createOutputReceiver(finalForm: FormData) {
    return this.http.post(environment.baseApiUrl + 'DirectExitReceiver', finalForm);
  }

  public createOutputReceiverDraft(finalForm: FormData) {
    return this.http.post(environment.baseApiUrl + 'DirectExitReceiver/asDraft', finalForm);
  }
}
