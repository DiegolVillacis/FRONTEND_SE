import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DataCentralService } from '../../services/controlGeneralServices';
import { PipesService } from '../../../pipes/pipes.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SeguridadService } from '../../services/seguridadService';
import { EditDialogComponent } from './editdialog/editDialog.component';

@Component({
  selector: 'app-opcionesmenu',
  templateUrl: './opcionesmenu.html'
})
export class OpcionesMenuComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: any;
  lregistros: any[] = [];

  lroles: any[] = [];
  ltransacciones: any[] = [];

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  // ITEMS DE PAGINACIÓN DE LA TABLA
  displayedColumns: string[] = ['id', 'nrol', 'nombre', 'crear', 'editar', 'eliminar', 'mostrarmenu','acciones'];
  pageSizeOptions = [5, 10, 20, 50];
  tamanio_pagina: number = 5;
  numero_pagina: number = 1;

  constructor(private segService: SeguridadService, private dcentral: DataCentralService, public pipe: PipesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id_rol: ['', [Validators.required, Validators.minLength(1)]],
      cruta: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      id_recursivo: [null],
      nombre_menu: ['', [Validators.maxLength(100)]],
      icono_menu: ['', [Validators.maxLength(100)]],
      crear: [false],
      editar: [false],
      eliminar: [false],
      mostrar_menu: [false]
    });

    this.ObtenerListaMenu();
    this.ObtenerTipoCatalogo();
  }
  
  ObtenerListaMenu() {
    this.segService.ListarMenu().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.dataSource = this.dcentral.llenarVariablesTabla(resp.menu, this.paginator);
      this.lregistros = this.dataSource.data;
    })
  }

  ManejarPagina(e: PageEvent) {
    this.numero_pagina = e.pageIndex + 1;
    this.tamanio_pagina = e.pageSize;
  }

  abirDialgo(registro: any) {
    registro.lroles = this.lroles;
    registro.ltransacciones = this.ltransacciones;  
    this.dcentral.dialog.open(EditDialogComponent, { width: '400px', data: registro})
      .afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerListaMenu()
        }
      })
  }

  Guardar(form) {
    form.nombre = form.nombre.toUpperCase(); 
    this.segService.MantenimientoMenu(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.ObtenerListaMenu();
      this.LimpiarCampos();
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
  }

  ObtenerTipoCatalogo() {
    this.segService.ListarRol().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.lroles = resp.rol;
    })
    this.segService.ListarTransaccion().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.ltransacciones = resp.transacciones;
    })
  }


  activeCheck(e) {
    this.pipe.fiAct = e.checked;
    this.pipe.filtroBDSBoolean(this.dataSource, this.pipe.fiAct)
  }

}
