import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/services/seguridadService';
import { UserService } from 'src/app/services/userServices';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './editDialog.component.html',
  styles: [
    ` .formularioRol {
        position: relative;
        z-index: 1;
      }

      /* Estilos CSS en tu archivo de estilos (por ejemplo, styles.scss) */
      .formulario {
          max-width: 600px; /* Ajusta según tus necesidades */
      }

      .inputs {
        width: 100%;
        top: -15px;
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
    `
  ]
})
export class EditDialogComponent implements OnInit {

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  lroles: any[] = [];

  hiddenpassword = true;

  constructor(
    private userService: UserService,
    private segService: SeguridadService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id_usuario: ['', [Validators.required]],
      // username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      nombre_usuario: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      apellido_usuario: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      cedula_usuario: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
      pass_usuario: ['', [Validators.maxLength(50)]],
      correo_usuario: ['', [Validators.maxLength(200)]],
      matriculado: [true],
      rol_usuario: [null],
      uservoto: [false],
      userestudiante: [false]
    });
    this.ObtenerTipoCatalogo();
    this.SetData();
  }

  SetData() {
    this.grupoFormulario.setValue({
      id_usuario: this.data.id_usuario,
      // username: this.data.username,
      nombre_usuario: this.data.nombre_usuario,
      apellido_usuario: this.data.apellido_usuario,
      cedula_usuario: this.data.cedula_usuario,
      pass_usuario: '',
      correo_usuario: this.data.correo_usuario,
      matriculado: this.data.matriculado,
      rol_usuario: this.data.rol_usuario,
      uservoto: this.data.uservoto,
      userestudiante: this.data.userestudiante
    })
  }

  Guardar(form) {
    form.nombre_usuario = form.nombre_usuario.toUpperCase();
    form.apellido_usuario = form.apellido_usuario.toUpperCase();
    if (form.pass_usuario == '') {
      delete form.pass_usuario;
    } else {
      form.pass_usuario = SHA256(form.pass_usuario).toString(); 
      this.dialogRef.close(true);

    }

    this.userService.ActualizarEstudiante(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
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
      id_usuario: this.data.id_usuario,
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
    this.dialogRef.close(false);
  }
}
