import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataCentralService } from './services/controlGeneralServices';
import { LoginService } from './services/loginServices';
import { User } from './models/user.iterface';
import { Menu } from './models/menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public url = '';

  public get muser(): User {
    return this.dcentral.user
  }

  public get mmenu(): Menu[] {
    return this.dcentral.menu
  }

  public get login(): boolean {
    return this.loginService.login;
  }

  constructor(
    public location: Location,
    private loginService: LoginService,
    private dcentral: DataCentralService
  ) { }

  ngOnInit() {
    this.loginService.setlogin(false);
    this.url = this.location.path();
    if ((localStorage.getItem('d') !== undefined && localStorage.getItem('d') !== null) || this.dcentral.validarToken()) {
      this.loginService.setlogin(true);
      this.ejecutarPermisos();
    }
  }

  async ejecutarPermisos() {
    try {
      this.dcentral.desencriptarDataUser();
      await this.dcentral.ConsultarMenu().subscribe(resp => {
        this.dcentral.setMenuRol(resp.menu);
      });
    } catch (error) { }

    if (this.muser == null || this.muser === undefined) {
      return;
    }
    this.iniciarAmbiente(this.muser);

  }

  iniciarAmbiente(user: User) {
  }

  validarUrl(url: string): string {
    const valida = url.includes("?token");
    let value = '/';
    if (valida) {
      value = url.split("?token")[0];
    } else {
      value = url;
    }
    return value;
  }

}
