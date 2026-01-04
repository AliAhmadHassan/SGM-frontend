import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private tokenService: TokenService) {}

  getPermissions() {
    const payload = this.tokenService.decodePayloadJWT();

    if (!payload) {
      return [];
    }
    return payload.Permission || [];
  }

  can(checkPermissions) {
    if (!Array.isArray(checkPermissions)) {
      checkPermissions = [checkPermissions];
    }
    const userPermissions = this.getPermissions();
    return checkPermissions.every(permission => userPermissions.includes(permission));
  }
  canAny(checkPermissions) {
    if (!Array.isArray(checkPermissions)) {
      checkPermissions = [checkPermissions];
    }
    const userPermissions = this.getPermissions();
    return !!checkPermissions.find(permission => userPermissions.includes(permission));
  }
}
