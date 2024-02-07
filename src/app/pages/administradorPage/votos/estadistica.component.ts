import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VotosService } from 'src/app/services/votoService';
import * as CryptoJS from 'crypto-js';

import * as XLSX from 'xlsx';

import 'jspdf-autotable';

import { pdfMake } from './pdfmake-configuration';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Chart, ChartOptions, ChartDataSets } from 'chart.js';


pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.sass']
})
export class EstadisticaComponent implements OnInit {

  showDownloadButton: boolean = false;

  bloqueAlterado: boolean = false;
  bloqueAlteradoIndex: number[] = [];

  mostrarBotonDescarga: boolean = false;

  votos: any = [];
  results: any = [];
  blockchainData: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('chartCanvas') private chartCanvas: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('chart') chart: ElementRef;
  public barChart: Chart;

  constructor(private votoServices: VotosService) { }

  ngOnInit() {
    this.votoServices.getVotosTotales().subscribe(res => {
      this.blockchainData = res;
      this.mapingResults(res);
      this.comprobarBloque(); // Llamada al método de verificación
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

    // Total de votos para cada lista
    const votosTotales = votos
      .filter(o => o.index > 0)
      .map(o => ({ nom_lista: o.data.nom_lista }))
      .reduce((a, l) => (a[l.nom_lista] ? a[l.nom_lista] += 1 : a[l.nom_lista] = 1, a), {});

    this.results = votosTotales;
  }


  comprobarBloque(): void {
    this.bloqueAlterado = false;
    this.bloqueAlteradoIndex = [];

    for (let i = 1; i < this.blockchainData.length; i++) {
      const currentBlock = this.blockchainData[i];
      const previousBlock = this.blockchainData[i - 1];

      if (currentBlock.hashAnterior !== previousBlock.hash) {
        // Los hashes anteriores no coinciden, la red está alterada
        this.bloqueAlterado = true;
        this.bloqueAlteradoIndex.push(i);
      }
    }
    // Actualizar el estado del botón de descarga
    this.mostrarBotonDescarga = this.bloqueAlterado;
  }



  OnClicksimularAlteracionBloque(alteredBlockIndexes: number[]) {
    this.simularAlteracionBloque(alteredBlockIndexes);
    this.showDownloadButton = true;
  }
  simularAlteracionBloque(indexBloques: number[]): void {

    // 
    indexBloques.forEach(indexBloqueAlterado => {
      if (indexBloqueAlterado >= 1 && indexBloqueAlterado < this.blockchainData.length) {
        const currentBlock = this.blockchainData[indexBloqueAlterado];
        const blockData = 'Datos del bloque';

        // Simula un hash diferente para cada bloque
        const alteredPreviousHash = `hash_alterado_${indexBloqueAlterado}`;

        // Calcula el nuevo hash utilizando CryptoJS
        const alteredHash = CryptoJS.SHA256(blockData + alteredPreviousHash).toString();

        // Aplica el nuevo hashAnterior al bloque
        currentBlock.hashAnterior = alteredHash;
      }
    });

    // Después de la simulación, verifica la integridad
    this.comprobarBloque();
  }






  exportarExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.blockchainData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bloques');
    XLSX.writeFile(wb, 'bloques.xlsx');
  }

  exportToPdf() {
    // Contenido del documento PDF
    const documentDefinition = {
      content: [
        {
          alignment: 'center',
          stack: [
            { text: 'VOTO', style: 'header' },
            { text: 'Blockchain Data:', style: 'subheader' },
          ],
        },
        ...this.blockchainData.map(block => ({
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 515,
              h: 0,
              r: 5,
              lineColor: 'black',
            },
          ],
          stack: [
            { text: `Bloque #${block.index}`, style: 'blockHeader' },
            { text: `Timestamp: ${block.timestamp}`, margin: [0, 5] },
            { text: `ID: ${block.data.id}`, margin: [0, 5] },
            { text: `Nom Lista: ${block.data.nom_lista}`, margin: [0, 5] },
            { text: `Descripción: ${block.data.descripcion}`, margin: [0, 5] },
            { text: `Nonce: ${block.nonce}`, margin: [0, 5] },
            { text: `Hash: ${block.hash}`, margin: [0, 5] },
            { text: `Hash Anterior: ${block.hashAnterior}`, margin: [0, 10] },
          ],
          margin: [0, 0, 0, 10],
        })),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        blockHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5],
        },
      },
      pageMargins: [20, 20, 20, 20],
    };

    // Generar y abrir el PDF
    pdfMake.createPdf(documentDefinition).open();
  }





  descargarBloquesAlterados(): void {
    // Array con bloques alterados
    const alteredBlocks = this.bloqueAlteradoIndex.map(index => this.blockchainData[index]);

    // archivo JSON - bloques alterados
    const jsonData = JSON.stringify(alteredBlocks, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'bloquesAlterados.json';
    link.click();
  }

  descargarBloques(): void {
    // archivo JSON - todos los bloques
    const jsonData = JSON.stringify(this.blockchainData, null, 2);
    this.descargarJSON(jsonData, 'redBlockchain.json');
  }

  private descargarJSON(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }


}