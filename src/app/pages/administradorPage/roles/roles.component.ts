import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DataCentralService } from '../../../services/controlGeneralServices';
import { PipesService } from '../../../../pipes/pipes.service';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeguridadService } from '../../../services/seguridadService';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: any;
  lregistros: any[] = [];

  /**
   * Variables formulario
   */
  public grupoFormulario: FormGroup;

  // ITEMS DE PAGINACIÓN DE LA TABLA
  // displayedColumns: string[] = ['id_rol', 'nombre_rol', 'acciones'];
  displayedColumns: string[] = ['id_rol', 'nombre_rol'];
  pageSizeOptions = [5, 10, 20, 50];
  tamanio_pagina: number = 5;
  numero_pagina: number = 1;

  constructor(
    private segService: SeguridadService,
    private dcentral: DataCentralService,
    public pipe: PipesService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id_rol: [''],
      nombre_rol: ['', [Validators.required, Validators.maxLength(100)]],
      habilitado_rol: [false],
      duracion_rol: ['', [Validators.required, Validators.maxLength(100)]]
    });

    this.ObtenerListaRol();
  }

  ObtenerListaRol() {
    this.segService.ListarRol().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.dataSource = this.dcentral.llenarVariablesTabla(resp.rol, this.paginator);
      this.lregistros = this.dataSource.data;
    });
  }

  ManejarPagina(e: PageEvent) {
    this.numero_pagina = e.pageIndex + 1;
    this.tamanio_pagina = e.pageSize;
  }



  private dialogAbierto: boolean = false;
  abrirDialogo(registro: any): void {
    if (!this.dialogAbierto) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '450px';
      dialogConfig.height = '375px';
      dialogConfig.data = registro;
      dialogConfig.position = {
        top: '-460px',
        left: '42%',
      };
      dialogConfig.panelClass = 'custom-dialog'; // Agrega una clase personalizada al diálogo
  
      const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerListaRol();
        }
        this.dialogAbierto = false; // Restablece la bandera cuando se cierra el diálogo
      });
  
      this.dialogAbierto = true; // Establece la bandera cuando se abre el diálogo
    }
  }
  ngOnDestroy() {
    if (this.dialogAbierto) {
      this.dialog.closeAll(); // Cierra todos los diálogos abiertos
    }
  }
  


  
  Guardar(form) {
    form.nombre_rol = form.nombre_rol.toUpperCase();
    this.segService.MantenimientoRol(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.ObtenerListaRol();
      this.LimpiarCampos();
    });
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
  }

  activeCheck(e) {
    this.pipe.fiAct = e.checked;
    this.pipe.filtroBDSBoolean(this.dataSource, this.pipe.fiAct);
  }

  onDeleteRecord() {
    // Puedes realizar acciones adicionales después de eliminar el registro
    // Por ejemplo, recargar los datos o realizar alguna otra operación
    this.ObtenerListaRol();
  }
}
