import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import BaseResponse from '../models/baseResponse.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  public fetchUserBranchOffice() {
    return this.http.get(environment.baseApiUrl + 'user/BranchOffices');
  }

  public fetchCities(ufId) {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'uf/' + ufId + '/cities');
  }

  public fetchUf() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'uf')
  }

  public fetchInstallationType() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'InstallationType/combo')
  }

  public fetchBranchOffice() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'BranchOffice/combo')
  }

  public fetchAddress() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'Address/combo')
  }

  public fetchProfile() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'UserProfile/Combo')
  }

  public fetchInstallation() {
    return this.http.get<BaseResponse<{ id: number, name: string }>>(environment.baseApiUrl + 'Installation/combo')
  }

  public fetchProject() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'Project/combo')
  }

  public fetchResponsible() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'User/combo')
  }

  public fetchReceiverType() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'ReceiverType/combo')
  }

  public fetchParentAction() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'ParentAction/combo')
  }

  public fetchOrder() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'Order/Combo')
  }

  public fetchDivergenceType() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'Divergence/combo')
  }

  public fetchMaterialWithoutOrder(filters = {}) {
    return this.http.get<BaseResponse<{ code: string, description: string, unity: string }>>(environment.baseApiUrl + 'MaterialCode/combo' + this.utilsService.getQueryString(filters))
  }

  public fetchDiscipline() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'Discipline/combo')
  }

  public fetchMaterialStatus() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'Materialstatus/combo')
  }

  public fetchRmaStatus() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'RMA/Status/combo')
  }

  public fetchReceiver() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'Receiver/combo')
  }

  public fetchRmaAttendanceStatus() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'RMAAttendance/Status/combo')
  }

  public fetchReceiverCode() {
    return this.http.get<BaseResponse<String[]>>(environment.baseApiUrl + 'Receiver/comboCode')
  }

  public fetchReasonProvisionGuide() {
    return this.http.get<BaseResponse<{ id: number, text: string }>>(environment.baseApiUrl + 'DirectExitTemporaryCustody/comboReasonProvisionGuide')
  }
}
