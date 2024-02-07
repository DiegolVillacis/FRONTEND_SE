import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeguridadService } from '../../../../../services/seguridadService';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './editDialog.component.html',
  styles: [
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
      direccion_operacion: ['', [Validators.required, Validators.maxLength(100),]],
      archivo_operacion: ['', [Validators.required, Validators.maxLength(255)]]
    });
    this.SetData();
  }

  SetData() {
    this.grupoFormulario.setValue({
      direccion_operacion: this.data.direccion_operacion,
      archivo_operacion: this.data.archivo_operacion,
    })
  }

  Guardar(form) {
    this.segService.MantenimientoTransaccion(form, 1).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      direccion_operacion: this.data.direccion_operacion,
      archivo_operacion: '',
    })
  }

}
