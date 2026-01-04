import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import HomeResponse from '../models/homeResponse.model';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { BASE_API_URL } from 'src/tokens';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private utils: UtilsService, @Inject(BASE_API_URL) private baseApiUrl: string) {
  }
}
