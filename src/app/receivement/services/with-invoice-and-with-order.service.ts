import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import { environment } from 'src/environments/environment';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { TokenService } from 'src/app/shared/services/token.service';
import WithInvoiceAndWithOrder from '../models/with-invoice-and-with-order.model';
import WithInvoiceAndWithOrderAndItems from '../models/with-invoice-and-with-order-and-items.model';

@Injectable({
  providedIn: 'root'
})
export class WithInvoiceAndWithOrderService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  fetchWithInvoiceAndWithOrder(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<WithInvoiceAndWithOrder>>(environment.baseApiUrl + 'ReceivementInvoiceOrder' +
      this.utils.getQueryString({ ...params, ...filters }));
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `BranchOffice/filiais.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }

  public fetchDetailsModal(orderCode: string) {
    return this.http.get<BaseResponse<WithInvoiceAndWithOrderAndItems>>(environment.baseApiUrl + 'ReceivementInvoiceOrder/WithItems?id=' + orderCode);
  }

  public registerDivergence(divergence: FormData) {
    return this.http.post(environment.baseApiUrl + 'Divergence', divergence);
  }
}