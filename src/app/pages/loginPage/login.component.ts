import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SHA256 } from 'crypto-js';
import { LoginService } from 'src/app/services/loginServices';
import { DataCentralService } from '../../services/controlGeneralServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  hide1 = true;

  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  passwordCtrl = new FormControl('', Validators.required);

  public CredencialesLoggin = new FormGroup({
    correo_usuario: this.emailCtrl,
    pass_usuario: this.passwordCtrl
  });

  constructor(
    public LoginService: LoginService,
    private dcentral: DataCentralService,
    private router: Router,
  ) {
    this.CredencialesLoggin.patchValue({
      correo_usuario: '',
      pass_usuario: ''
    })
  }

  ngOnInit() {

  }

  IniciarSession(form) {
    let clave = SHA256( form.pass_usuario ).toString();

    let dataUsuario = {
      correo_usuario: form.correo_usuario,
      pass_usuario: clave
    };

    this.LoginService.loginUser(dataUsuario).subscribe(res => {

      if (res.cod === "ERROR") {
        return;
      }
      this.SuccessResponse(res);

    })
  }

  SuccessResponse(res) {
    this.LoginService.logout();
    this.dcentral.encriptarData(res);
    this.dcentral.desencriptarDataUser(); // es necesario para actualizacion rapida de los datos en el sistema.
    this.LoginService.setlogin(true);
    this.dcentral.setMenuRol(res.menu); 
  }



}
