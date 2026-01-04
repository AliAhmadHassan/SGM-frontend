import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormCreateStmService {

  constructor(private http: HttpClient) { }

  public createStm(form: FormData) {
    return this.http.post(environment.baseApiUrl + 'STM', form);
  }
  public createStmDraft(form: FormData) {
    return this.http.post(environment.baseApiUrl + 'STM/AsDraft', form);
  }
}
