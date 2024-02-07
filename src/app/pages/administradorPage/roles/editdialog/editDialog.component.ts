import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeguridadService } from '../../../../services/seguridadService';

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
      top: -5px;
      margin-bottom: 10px; /* Espaciado inferior opcional */
      z-index: 10;
      position: relative;
      background: white;
    }

    .form{
      z-index: 10;
      position: center;
      width: 50%;
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

  constructor(
    private segService: SeguridadService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id_rol: ['', [Validators.required]],
      nombre_rol: ['', [Validators.required, Validators.maxLength(100)]],
      habilitado_rol: [false],
      duracion_rol: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.SetData();
  }

  SetData() {
    this.grupoFormulario.setValue({
      id_rol: this.data.id_rol,
      nombre_rol: this.data.nombre_rol,
      habilitado_rol: this.data.habilitado_rol,
      duracion_rol: this.data.duracion_rol,
    })
  }

  Guardar(form) {
    this.segService.MantenimientoRol(form, 1).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      id_rol: this.data.id_rol,
      nombre_rol: '',
      habilitado_rol: false,
      duracion_rol: ''
    })
    this.dialogRef.close(false);

  }

}
