import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public getToken(): string {
    return localStorage.getItem('auth.token');
  }

  public decodePayloadJWT(token: string = this.getToken()): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
