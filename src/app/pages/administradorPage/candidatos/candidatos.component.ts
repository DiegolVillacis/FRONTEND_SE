import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CandidaturaService } from 'src/app/services/candidatosServices';
import { DataCentralService } from '../../../services/controlGeneralServices';
import { ICandidatos } from '../../../models/proceso.interface';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit {


  // ITEMS DE PAGINACIÓN DE LA TABLA
  displayedColumns: string[] = ['id_usuario', 'fullname', 'cedula_usuario', 'correo_usuario', 'matriculado', 'acciones'];
  pageSizeOptions = [5, 10, 15, 20];
  tamanio_pagina: number = 5;
  numero_pagina: number = 1;

  
  /**
   * Variables inicio de pantalla
   */
  lista_candidato: number;
  QueryParams: any = [];
  imagen_local: string;
  HabilitarRegistro: boolean = false;

  /**
   * Varibles formulario
   */
  nombreCtrl = new FormControl('', Validators.required)
  apellidoCtrl = new FormControl('', Validators.required)
  cargoCtrl = new FormControl('', Validators.required)

  public CandidatosForm = new FormGroup({
    nombre_candidato: this.nombreCtrl,
    apellido_candidato: this.apellidoCtrl,
    cargo_candidato: this.cargoCtrl
  });
  
  /**
   * Variables Tabla de datos
   */
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  candidatos: any = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private candidaturaService: CandidaturaService,
    private dcentral: DataCentralService,
    private dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.lista_candidato = parseInt(this.rutaActiva.snapshot.params.id)

    this.FuncionalidadInicial();
    this.ObtenerListaCandidatos(this.lista_candidato)
  }

  FuncionalidadInicial() {
    this.imagen_local = localStorage.getItem('imagen-lista')

    this.rutaActiva.queryParams.subscribe(obj => {
      this.QueryParams = [obj];
      if (obj.estado === 'true') {
        this.HabilitarRegistro = true
      }

    })
  }

  ObtenerListaCandidatos(lista_candidato) {
    this.candidatos = []
    this.candidaturaService.ListaCandidatos(lista_candidato).subscribe(res => {
      
      if (res.cod == "ERROR") { return; }

      this.dataSource = new MatTableDataSource(res.LISTA_CANDIDATOS as ICandidatos[]);
      this.candidatos = this.dataSource.data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  GuardarCandidato(form) {
    let data = {
      nombre_candidato: form.nombre_candidato,
      apellido_candidato: form.apellido_candidato,
      cargo_candidato: form.cargo_candidato,
      lista_candidato: this.lista_candidato
    }
    this.candidaturaService.RegistrarCandidato(data).subscribe(res => {
      if (res.cod === "ERROR") {
        this.HabilitarRegistro = false;
        return;
      }
      this.ObtenerListaCandidatos(this.lista_candidato);
      this.LimpiarCampos();
    })
  }

  LimpiarCampos() {
    this.CandidatosForm.reset();
    
  }

  volverPaginaAnterior(): void {
    this.location.back();
}

ManejarPagina(e: PageEvent) {
  this.numero_pagina = e.pageIndex + 1;
  this.tamanio_pagina = e.pageSize;
}


  abirDialgo1( registro: any) {
    this.dcentral.dialog.open(EditDialogComponent, { width: '400px', data: registro, })
      .afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerListaCandidatos(this.lista_candidato)
        }
      })
  }

  private dialogAbierto: boolean = false;
  abrirDialogo(registro: any): void {
    if (!this.dialogAbierto) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '500px';
      dialogConfig.height = '460px';
      dialogConfig.data = registro;
      dialogConfig.position = {
        top: '-610px',
        left: '40%',
      };
      dialogConfig.panelClass = 'custom-dialog'; // Agrega una clase personalizada al diálogo
  
      const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerListaCandidatos(this.lista_candidato)
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

}
