import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import BaseResponse from 'src/app/shared/models/baseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class FormWithInvoiceAndWithoutOrderService {

  constructor(private http: HttpClient) { }

  public comboProviderReason(){
    return this.http.get<BaseResponse<{ id: number, description: string}>>(environment.baseApiUrl + 'ReasonWithoutOrder/comboProviderReason');
  }

  public comboProviders(){
    return this.http.get<BaseResponse<{ id: number, companyName: string }>>(environment.baseApiUrl + 'Provider/comboProvider');
  }

  public receivementInvoiceOrderDraft(draftForm: FormData) {
    return this.http.post(environment.baseApiUrl + 'ReceivementInvoiceWithoutOrder/asDraft', draftForm);
  }

  public receivementInvoiceOrder(finalForm: FormData) {
    return this.http.post(environment.baseApiUrl + 'ReceivementInvoiceWithoutOrder', finalForm);
  }
}
