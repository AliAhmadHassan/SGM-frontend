import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TokenService } from 'src/app/shared/services/token.service';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import ApproveRma from 'src/app/receivement/models/with-invoice-and-with-order.model';
import { environment } from 'src/environments/environment';
import ApproveRmaAndItems from '../models/approve-rma-and-items.model';
import Patch from 'src/app/shared/models/patch.model';
import { selectAuthUser } from 'src/app/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { AuthState } from 'src/app/auth/auth.reducer';
// import ApproveRmaAndItems from 'src/app/receivement/models/with-invoice-and-with-order-and-items.model';

@Injectable({
  providedIn: 'root'
})
export class ApproveRmaService {

  public user$ = this.storeAuth.pipe(select(selectAuthUser));

  constructor(
    private storeAuth: Store<AuthState>,
    private http: HttpClient,
    private utils: UtilsService,
    private tokenService: TokenService) { }

  fetchApproveRma(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<ApproveRma>>(environment.baseApiUrl + 'RMA' +
      this.utils.getQueryString({ ...params, ...filters }));
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `BranchOffice/filiais.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }

  public fetchDetailsModal(rmaId: string) {
    return this.http.get<BaseResponse<ApproveRmaAndItems>>(environment.baseApiUrl + 'RMA/Details/' + rmaId);
  }

  public registerDivergence(divergence: FormData) {
    return this.http.post(environment.baseApiUrl + 'Divergence', divergence);
  }

  public patchStatus(rmaId: string, patch: Patch[]) {
    patch[0].path = '/statusId';
    patch[1].path = '/approverUserId';
    let approverId;
    this.user$.subscribe( data => approverId = data);
    patch[1].value = 10; //ID do Usuário logado

    return this.http.patch(environment.baseApiUrl + 'RMA/ApproveOrReprove/' + rmaId, patch);
  }
}
