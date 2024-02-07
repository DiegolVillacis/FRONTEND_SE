import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SHA256 } from 'crypto-js';
import { SeguridadService } from 'src/app/services/seguridadService';
import { UserService } from 'src/app/services/userServices';

@Component({
  selector: 'app-registrar-dialog',
  templateUrl: './registrarDialog.component.html',
  styles: [`

    .opc{
      right: -300px;
    }
    mat-form-field {
      margin: 0px 10px;
    }
    .formularioRol {
        position: relative;
        z-index: 1;
      }

      /* Estilos CSS en tu archivo de estilos (por ejemplo, styles.scss) */
      .formulario {
          max-width: 600px; /* Ajusta según tus necesidades */
      }

      .inputs {
        width: 100%;
        top: -13.5px;
        margin-bottom: 10px; /* Espaciado inferior opcional */
        z-index: 10;
        position: relative;
        background: white;
      }

      .form{
        z-index: 10;
        position: center;
        width: 100%;
      }

      .custom-icon {
        color: #3366ff; /* Cambia el color del ícono según tus preferencias */
        cursor: pointer; /* Agrega un cursor señalando que el ícono es interactivo */
        position: relative;
      }
    .checked {
      display: flex;
      align-content: left;
      align-items: left;
      width: 30%
    }
  `]
})
export class RegistrarDialogComponent implements OnInit {

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  lroles: any[] = [];

  hiddenpassword = true;

  constructor(
    private userService: UserService,
    private segService: SeguridadService,
    public dialogRef: MatDialogRef<RegistrarDialogComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      // username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      nombre_usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      apellido_usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      cedula_usuario: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
      pass_usuario: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      correo_usuario: ['', [Validators.maxLength(200)]],
      matriculado: [true, [Validators.required]],
      rol_usuario: [null, [Validators.required]],
      uservoto: [false],
      userestudiante: [true]
    });
    this.ObtenerTipoCatalogo();
  }

  Guardar(form) {
    form.nombre_usuario = form.nombre_usuario.toUpperCase();
    form.apellido_usuario = form.apellido_usuario.toUpperCase();
    form.pass_usuario = SHA256(form.pass_usuario).toString();
    this.userService.RegistrarEstudiante(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
    // console.log(this.grupoFormulario.valid);
  }

  ObtenerTipoCatalogo() {
    this.segService.ListarRol().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.lroles = resp.rol;
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      // username: '',
      nombre_usuario: '',
      apellido_usuario: '',
      cedula_usuario: '',
      pass_usuario: '',
      correo_usuario: '',
      matriculado: null,
      rol_usuario: null,
      uservoto: false,
      userestudiante: null
    })
    this.dialogRef.close(true);

  }

}