import BaseResponse from 'src/app/shared/models/baseResponse.model';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/services/token.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import TransferAttendanceMaterial from '../models/transfer-attendance-material.model';

@Injectable({
  providedIn: 'root'
})
export class TransferAttendanceMaterialService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  public fetchDetailsModal(stm: number) {
    return this.http.get<BaseResponse<TransferAttendanceMaterial>>(environment.baseApiUrl + `TransferAttendanceMaterial/Details/${stm}`);
  }

  fetchTransferAttendanceMaterial(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<TransferAttendanceMaterial>>(environment.baseApiUrl + 'TransferAttendanceMaterial' +
      this.utils.getQueryString({ ...params, ...filters }));
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `BranchOffice/filiais.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }
}
