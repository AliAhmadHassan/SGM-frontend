import { Injectable } from '@angular/core';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/shared/services/utils.service';
import RmaAttendance from '../models/rma-attendance';

@Injectable({
  providedIn: 'root'
})
export class RmaAttendanceService {

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
  ) { }

  fetchRmaAttendence(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<RmaAttendance>>(environment.baseApiUrl + 'RMAAttendance' +
      this.utils.getQueryString({ ...params, ...filters }));
  }

  fetchDetailsModal(id: number) {
    return this.http.get<BaseResponse<RmaAttendance>>(environment.baseApiUrl + 'RMAAttendance/WithItems/' + 
    this.utils.getQueryString({ id }));
  }
}
