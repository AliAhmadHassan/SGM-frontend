import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import Provider from '../model/provider.model';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  fetchProviders(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<Provider>>(environment.baseApiUrl + 'provider' +
                                                  this.utils.getQueryString({ ...params, ...filters }));
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `Provider/fornecedores.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }
}
