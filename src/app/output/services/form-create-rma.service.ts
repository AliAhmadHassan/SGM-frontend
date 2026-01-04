import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import BaseResponse from 'src/app/shared/models/baseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class FormCreateRmaService {

  constructor(private http: HttpClient) { }

  public createRma(form: FormData) {
    return this.http.post(environment.baseApiUrl + 'RMA', form);
  }

}
