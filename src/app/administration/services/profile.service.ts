import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { HttpClient } from '@angular/common/http';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { environment } from 'src/environments/environment';
import { Profile, ProfileRequest} from '../model/profile.model';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  public fecthProfile(params: PaginatedRequest, filters = {}){
    return this.http.get<BaseResponse<Profile>>(environment.baseApiUrl + 'UserProfile' + 
                                                this.utils.getQueryString({ ...params, ...filters }));
  }

  public registerProfile(Profile: ProfileRequest) {
    return this.http.post(environment.baseApiUrl + 'UserProfile/', Profile);
  }

  public deleteProfile(ProfileId) {
    return this.http.delete(environment.baseApiUrl + 'UserProfile/' + ProfileId);
  }

  public changeProfile(Profile: ProfileRequest, id: number) {
    return this.http.put(environment.baseApiUrl + 'UserProfile/' + id, Profile);
  }

  public fetchActions() {
    return this.http.get<BaseResponse<{ id: number , description: string, actions: [{id: number, description: string}] }>>(environment.baseApiUrl + 'Action')
  }

  public fetchProfileId(id) {
    return this.http.get<BaseResponse<Profile>>(environment.baseApiUrl + 'UserProfile/'+ id);
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `UserProfile/perfis.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }
}
