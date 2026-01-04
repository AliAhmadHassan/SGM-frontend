import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import WithInvoiceAndWithOrderAndItems from '../models/with-invoice-and-with-order-and-items.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class FormWithInvoiceAndWithOrderService {

  constructor(private http: HttpClient) { }

  public fetchDetailsModal(orderCode: string) {
    return this.http.get<BaseResponse<WithInvoiceAndWithOrderAndItems>>(environment.baseApiUrl + 'ReceivementInvoiceOrder/WithItems?id=' + orderCode);
  }

  public registerDivergence(divergence: FormData) {
    return this.http.post(environment.baseApiUrl + 'Divergence', divergence);
  }
  
  public receivementInvoiceOrderDraft(ReceivementInvoiceOrderDraft: FormData) {
    return this.http.post(environment.baseApiUrl + 'ReceivementInvoiceOrder/AsDraft', ReceivementInvoiceOrderDraft);
  }

  public receivementInvoiceOrder(ReceivementInvoiceOrder: FormData) {
    return this.http.post(environment.baseApiUrl + 'ReceivementInvoiceOrder', ReceivementInvoiceOrder);
  }
}
