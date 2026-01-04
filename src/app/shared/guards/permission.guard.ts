import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = route.data.permissions as number[];
    const hasPermission = this.permissionService.can(permissions);

    if (!hasPermission) {
      this.router.navigate(['/']);
    }

    return hasPermission;
  }

  constructor(private permissionService: PermissionService, private router: Router) {}

}
