import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeguridadService } from '../../../services/seguridadService';
import { DataCentralService } from '../../../../app/services/controlGeneralServices';

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

  lroles: any[] = [];
  ltransacciones: any[] = [];

  constructor(
    private dcentral: DataCentralService,
    private segService: SeguridadService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id: ['', [Validators.required]],
      id_rol: ['', [Validators.required, Validators.minLength(1)]],
      cruta: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      id_recursivo: [null],
      nombre: ['', [Validators.maxLength(100)]],
      icon: ['', [Validators.maxLength(100)]],
      crear: [false],
      editar: [false],
      eliminar: [false],
      mostrarmenu: [false]
    });
    this.SetData();
  }

  SetData() {
    this.lroles = this.data.lroles;
    this.ltransacciones = this.data.ltransacciones;
    this.grupoFormulario.setValue({
      id: this.data.id,
      id_rol: this.data.id_rol,
      cruta: this.data.cruta,
      id_recursivo: this.data.id_recursivo,
      nombre: this.data.nombre,
      icon: this.data.icon,
      crear: this.data.crear,
      editar: this.data.editar,
      eliminar: this.data.eliminar,
      mostrarmenu: this.data.mostrarmenu,
    })
  }

  Guardar(form) {
    form.nombre_rol = form.nombre_rol.toUpperCase();
    this.segService.MantenimientoMenu(form, 1).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      id: this.data.id,
      id_rol: '',
      cruta: '',
      id_recursivo: this.data.id_recursivo,
      nombre: '',
      icon: this.data.icon,
      crear: false,
      editar: false,
      eliminar: false,
      mostrarmenu: false,
    })
  }




}
