import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataCentralService } from 'src/app/services/controlGeneralServices';
import { UserService } from 'src/app/services/userServices';
import { PipesService } from 'src/pipes/pipes.service';

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrl: './multas.component.css'
})
export class MultasComponent implements OnInit{


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  lregistros: any[] = [];

  // ITEMS DE PAGINACIÓN DE LA TABLA
  displayedColumns: string[] = ['id_usuario', 'fullname', 'cedula_usuario', 'correo_usuario', 'matriculado', 'uservoto'];
  pageSizeOptions = [5, 10, 15, 20];
  tamanio_pagina: number = 10;
  numero_pagina: number = 1;

  constructor(private estudianteService: UserService, private dcentral: DataCentralService, public pipe: PipesService) { }

  ngOnInit(): void {
    this.ObtenerListaEstudiantes();
  }

  ObtenerListaEstudiantes() {
    this.estudianteService.ListaEstudiantesnovoto().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.dataSource = this.dcentral.llenarVariablesTabla(resp.users, this.paginator);
      this.lregistros = this.dataSource.data;

      // Configura el sort
      this.dataSource.sort = this.sort;

    })
  }


  exportToExcel(): void {
    const fileName = 'usuariosNoVoto.xlsx';

    // Filtrar los datos si es necesario
    const filteredData = this.dataSource.filteredData || this.lregistros;

    // Convertir los datos a un arreglo de objetos
    const data = filteredData.map(item => ({
      'Id': item.id_usuario,
      'Nombre': item.fullname,
      'Cedula': item.cedula_usuario,
      'Correo': item.correo_usuario,
      'Activo': item.matriculado ? 'Sí' : 'No',
      'Voto': item.uservoto ? 'Sí' : 'No',
    }));

    // Crear un libro de Excel y agregar la hoja de datos
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    // Guardar el libro como un archivo Excel
    XLSX.writeFile(wb, fileName);
  }

  ManejarPagina(e: PageEvent) {
    this.numero_pagina = e.pageIndex + 1;
    this.tamanio_pagina = e.pageSize;
  }

  





  ngOnDestroy() {

  }


  activeCheck(e) {
    this.pipe.fiAct = e.checked;
    this.pipe.filtroBDSBoolean(this.dataSource, this.pipe.fiAct)
  }

}


