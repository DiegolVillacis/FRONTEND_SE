import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, ChartOptions, ChartDataSets } from 'chart.js';
import { DataCentralService } from 'src/app/services/controlGeneralServices';
import { UserService } from 'src/app/services/userServices';
import { VotosService } from 'src/app/services/votoService';

import 'jspdf-autotable';

import { pdfMake } from './pdfmake-configuration';

import * as XLSX from 'xlsx';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('chartCanvas') private chartCanvas: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('chart') chart: ElementRef;
  public barChart: Chart;
  

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  

  votos: any = [];
  results: any = [];
  blockchainData: any = [];
  dataSource: MatTableDataSource<any>;

  
  lregistros: any[] = [];
  numeroTotalUsuarios: number = 0;

  totalVotos: number = 0; // Inicialización con un valor numérico

  // Nuevas propiedades para el gráfico de barras
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  

  // Datos para el gráfico de barras
  public barChartData: ChartDataSets[] = [];

  constructor(private votoServices: VotosService, private estudianteService: UserService, private dcentral: DataCentralService) { }

  ngOnInit() {
    this.ObtenerListaEstudiantesVotantes();

    this.votoServices.getVotosTotales().subscribe(res => {
      this.votos = res;
      this.mapingResults(res);
      this.createGraphic();
    });
  }

  mapingResults(votos: any[]) {
    // Mostrar la información del bloque en la cadena
    const data = votos.map(o => ({
      index: o.index,
      hashAnterior: o.hashAnterior,
      timestamp: o.timestamp,
      data: o.data,
      nonce: o.nonce,
      hash: o.hash
    }));

    this.blockchainData = data;

    // Calcular el total de votos
    const votosTotales: Record<string, number> = votos
      .filter(o => o.index > 0)
      .map(o => ({ nom_lista: o.data.nom_lista }))
      .reduce((a, l) => {
        const lista = l.nom_lista as string; // Asegurarse de que nom_lista es una cadena
        a[lista] ? a[lista] += 1 : a[lista] = 1;
        return a;
      }, {});

    this.results = votosTotales;

    // Calcular el total de votos
    this.totalVotos = Object.values(votosTotales).reduce((total, votos) => total + votos, 0);
  }



  createGraphic() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    
    const labels = Object.keys(this.results);
    const data = Object.values(this.results);
  
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Votos por Lista',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true,
            axis: 'y', // Asegura que estás ajustando el eje y
            stepSize: 1 // Establece el tamaño del paso a 1
          }
        }
      }
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ObtenerListaEstudiantesVotantes() {
    this.estudianteService.ListaEstudiantesnovota().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }

      this.dataSource = new MatTableDataSource(resp.users);
      this.lregistros = this.dataSource.data;

      // Contar el número total de usuarios
      this.numeroTotalUsuarios = this.dataSource.data.length;
    });
  }


  exportToPdf() {
    // Configuración de pdfmake
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Bold.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-BoldItalic.ttf'
      }
    };

    // Contenido del documento PDF
    const documentDefinition = {
      content: [
        {
          alignment: 'center',
          stack: [
            { text: 'RESULTADO ELECTORAL', style: 'header' },
            {
              columns: [
                { width: 'auto', text: 'Personas que votaron: ' + this.totalVotos },
                { width: 'auto', text: 'Número total de votantes: ' + this.numeroTotalUsuarios },
                { width: 'auto', text: 'Personas restantes: ' + (this.numeroTotalUsuarios - this.totalVotos) }
              ],
              margin: [0, 10]
            }
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto'],
            body: [
              ['Lista', 'Votos', 'Porcentaje'],
              ...Object.entries(this.results).map(([key, value]: [string, number]) => [
                key,
                `${value} votos`,
                {
                  text: `${(value / this.numeroTotalUsuarios * 100).toFixed(1)}%`,
                  style: 'progressText'
                }
              ])
            ]
          }
        },
        {
          text: '    ', 
        },
        {
          text: '    ', 
        },
        {
          text: '    ', 
        },
        
        {
          image: this.getChartImage(),
          width: 550 
        }
      ],
      styles: {
        progressText: {
          fontSize: 12,
          alignment: 'center',
        }
      }
    };

    // Generar y abrir el PDF
    pdfMake.createPdf(documentDefinition).open();
  }

  private getChartImage(): string {
    const canvas = this.chartCanvas.nativeElement;
    return canvas.toDataURL('image/png');
  }





  // Función para exportar a Excel
  exportToExcel() {
    const content = this.content.nativeElement;

    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();

    // Crear una hoja de trabajo y agregar la tabla
    const worksheet = XLSX.utils.table_to_sheet(content);
 
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja 1');

    // Descargar el archivo
    XLSX.writeFile(workbook, 'resultado_electoral.xlsx');
  }

}
