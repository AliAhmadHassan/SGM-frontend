import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Material from '../model/material.model';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  public fetchMaterials(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<Material>>(environment.baseApiUrl + 'material' +
                                                  this.utils.getQueryString({ ...params, ...filters }));
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `Material/material.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }
}
