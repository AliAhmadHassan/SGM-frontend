import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { TokenService } from 'src/app/shared/services/token.service';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinalRecipientService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  public fetchReceiver(params: PaginatedRequest, filters = {}) {
    return this.http.get(environment.baseApiUrl + 'receiver' +
      this.utils.getQueryString({ ...params, ...filters }))
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + `Receiver/destinatarios.csv` +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }

  public changeReceiver(receiver) {
    return this.http.put(environment.baseApiUrl + 'receiver/' + receiver.id, receiver);
  }

  public registerReceiver(receiver) {
    return this.http.post(environment.baseApiUrl + 'receiver/', receiver);
  }

  public deleteReceiver(id) {
    return this.http.delete(environment.baseApiUrl + 'receiver/' + id);
  }
}
