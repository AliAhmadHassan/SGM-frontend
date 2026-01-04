import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { TokenService } from 'src/app/shared/services/token.service';
import TransferBetweenInstallations from '../models/transfer-between-installations';

@Injectable({
  providedIn: 'root'
})
export class FormTransferBetweenInstallationsService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }

  public fetchDetailsModal(stm: string) {
    return this.http.get<BaseResponse<TransferBetweenInstallations>>(environment.baseApiUrl + 'STM/' + stm);
  }

  public transferBetweenInstallationsDraft(TransferBetweenInstallationsDraft: FormData) {
    return this.http.post(environment.baseApiUrl + 'Transfer/AsDraft', TransferBetweenInstallationsDraft);
  }

  public transferBetweenInstallations(TransferBetweenInstallations: FormData) {
    return this.http.post(environment.baseApiUrl + 'Transfer', TransferBetweenInstallations);
  }
}
