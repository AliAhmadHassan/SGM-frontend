import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../../tokens';
import LoginResponse from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseApiUrl: string) { }

  public login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseApiUrl}Authentication`, { username: email, password });
  }

  authorize(installationId: number){
    return this.http.post<LoginResponse>(`${this.baseApiUrl}Authorization/` + installationId, { } );
  }
}
