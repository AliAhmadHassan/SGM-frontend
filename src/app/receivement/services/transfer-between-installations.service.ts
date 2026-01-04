import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import { environment } from 'src/environments/environment';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { TokenService } from 'src/app/shared/services/token.service';
import TransferBetweenInstallations from '../models/transfer-between-installations';

@Injectable({
  providedIn: 'root'
})
export class TransferBetweenInstallationsService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  fetchTransferBetweenInstallations(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<TransferBetweenInstallations>>(environment.baseApiUrl + 'STM' +
      this.utils.getQueryString({ ...params, ...filters }));
  }

  public fetchDetailsModal(stm: string) {
    return this.http.get<BaseResponse<TransferBetweenInstallations>>(environment.baseApiUrl + 'STM/' + stm);
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `BranchOffice/filiais.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }

}
