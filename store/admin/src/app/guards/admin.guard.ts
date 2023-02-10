import { AdminService } from './../services/admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AdminGuard implements CanActivate {

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {

  }

  canActivate(): any {
    if (!this._adminService.isAuthenticated(['admin'])) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
