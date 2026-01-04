import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/shared/services/utils.service';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { TokenService } from 'src/app/shared/services/token.service';
import { Address, AddressRequest } from '../model/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  public fecthAddress(params: PaginatedRequest, filters = {}){
    return this.http.get<BaseResponse<Address>>(environment.baseApiUrl + 'address' + 
                                                this.utils.getQueryString({ ...params, ...filters }));
  }

  public registerAddress(address) {
    return this.http.post(environment.baseApiUrl + 'address/', address);
  }

  public deleteAddress(addressId) {
    return this.http.delete(environment.baseApiUrl + 'address/' + addressId);
  }

  public changeAddress(address: AddressRequest, id: number) {
    return this.http.put(environment.baseApiUrl + 'address/' + id, address);
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `address/enderecos.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }
}
