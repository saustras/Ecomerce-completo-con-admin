
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from '../services/client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _clientService: ClientService,
    private _router: Router
  ) {

  }

  canActivate(): any {
    if (!this._clientService.isAuthenticated()) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
