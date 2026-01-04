import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { environment } from 'src/environments/environment';
import Installation from '../model/installation.model';
import { TokenService } from 'src/app/shared/services/token.service';
import InstallationRequest from '../model/installation-request.model';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  fetchInstallation(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<Installation>>(environment.baseApiUrl + 'installation' +
      this.utils.getQueryString({ ...params, ...filters }));
  }

  private newInstallationRequest(installation: InstallationRequest){
    var newInstallationRequest =
    {
      name: installation.name,
      // code: installation.code,
      description: installation.description,
      typeId: installation.typeId,
      projectId: installation.projectId,
      addressId: installation.addressId,
      thirdMaterialPermission: installation.thirdMaterialPermission,
    }
    return newInstallationRequest;
  }

  public newInstallation(installation: InstallationRequest) {
    return this.http.post(environment.baseApiUrl + 'installation', this.newInstallationRequest(installation));
  }

  public deleteInstallation(installationId) {
    return this.http.delete(environment.baseApiUrl + 'Installation/' + installationId);
  }

  public getInstallation(installationId: number) {
    return this.http.get<BaseResponse<InstallationRequest>>(environment.baseApiUrl + 'Installation/' + installationId);
  }

  public editInstallation(installation: InstallationRequest, installationId: number) {
    return this.http.put(environment.baseApiUrl + 'Installation/' + installationId, this.newInstallationRequest(installation));
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `Installation/instalacoes.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }
}
