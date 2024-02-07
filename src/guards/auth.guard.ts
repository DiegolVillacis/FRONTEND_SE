import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../app/services/loginServices';
import { DataCentralService } from '../app/services/controlGeneralServices';
import { MenuNode, Menu } from '../app/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dcentral: DataCentralService
  ) { }

  public get menu(): Menu[] {
    return this.dcentral.menu
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.loginService.loggedIn()) {
      const url = this.menu.filter(o => {
        let [r] = o.hijos.filter(c => { return c.direccion_menu == route.routeConfig.path })
          .map(c => { 
            this.dcentral.setPermisos(c);
            return c;
           })
        return r !== undefined
      })

      if (url.length > 0) {
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;
  }

}
