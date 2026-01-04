import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { User, UserRequest, UserAD } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  fetchUser(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<User>>(environment.baseApiUrl + 'user' +
                                                  this.utils.getQueryString({ ...params, ...filters }));
  }

  public editUser(user: UserRequest, id: number) {
    return this.http.put(environment.baseApiUrl + 'user/' + id, user);
  }

  public registerUser(user: UserRequest) {
    return this.http.post(environment.baseApiUrl + 'user', user);
  }

  public deleteUser(id) {
    return this.http.delete(environment.baseApiUrl + 'user/' + id);
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `user/usuarios.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }

  public fetchNameAd() {
    return this.http.get<BaseResponse<UserAD>>(environment.baseApiUrl + 'user/usersAD');
  }
}
