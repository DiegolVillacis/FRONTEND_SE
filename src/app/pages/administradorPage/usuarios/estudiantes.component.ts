import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/userServices';
import { DataCentralService } from '../../../services/controlGeneralServices';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PipesService } from '../../../../pipes/pipes.service';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { RegistrarDialogComponent } from './registrardialog/registrarDialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']

})
export class EstudiantesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  lregistros: any[] = [];

  // ITEMS DE PAGINACIÓN DE LA TABLA
  displayedColumns: string[] = ['id_usuario', 'fullname', 'cedula_usuario', 'correo_usuario', 'matriculado', 'acciones'];
  pageSizeOptions = [5, 10, 15, 20];
  tamanio_pagina: number = 5;
  numero_pagina: number = 1;

  constructor(private estudianteService: UserService, private dcentral: DataCentralService, public pipe: PipesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ObtenerListaEstudiantes();
  }

  ObtenerListaEstudiantes() {
    this.estudianteService.ListaEstudiantes().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.dataSource = this.dcentral.llenarVariablesTabla(resp.users, this.paginator);
      this.lregistros = this.dataSource.data;

      // Configura el sort
      this.dataSource.sort = this.sort;

    })
  }

  ManejarPagina(e: PageEvent) {
    this.numero_pagina = e.pageIndex + 1;
    this.tamanio_pagina = e.pageSize;
  }


  //DIALOGO
  private dialogAbierto: boolean = false;
  abirDialgoEdit(registro: any) {
    if (!this.dialogAbierto) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '550px';
      dialogConfig.height = '750px';
      dialogConfig.data = registro;
      dialogConfig.position = {
        top: '-800px',
        left: '40%',
      };
      dialogConfig.panelClass = 'custom-dialog'; // Agrega una clase personalizada al diálogo

      const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerListaEstudiantes();
        }
        this.dialogAbierto = false; // Restablece la bandera cuando se cierra el diálogo
      });

      this.dialogAbierto = true; // Establece la bandera cuando se abre el diálogo
    }
  }



  abirDialgoRegistro() {
    if (!this.dialogAbierto) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '550px';
      dialogConfig.height = '750px';
      dialogConfig.position = {
        top: '-800px',
        left: '40%',
      };
      dialogConfig.panelClass = 'custom-dialog'; // Agrega una clase personalizada al diálogo

      const dialogRef = this.dialog.open(RegistrarDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerListaEstudiantes();
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


  activeCheck(e) {
    this.pipe.fiAct = e.checked;
    this.pipe.filtroBDSBoolean(this.dataSource, this.pipe.fiAct)
  }

}




//ACTUALIZAR CAMPOS DE UNA TABLA
// UPDATE usuario
// SET uservoto = false;