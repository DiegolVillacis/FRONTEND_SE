import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from 'src/app/services/lista.service';
import { RegistrarDialogComponent } from './registrardialog/registrarDialog.component';
import { DataCentralService } from '../../../services/controlGeneralServices';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  dialogRef: MatDialogRef<any>;

  id_proceso: number;
  QueryParams: any = [];

  Btn_Agregar: boolean = false;
  listaCandidatos: any = [];

  
  HabilitarCards: boolean = false;
  constructor(
    private rutaActiva: ActivatedRoute,
    private listaService: ListaService,
    private dcentral: DataCentralService,
    private dialog: MatDialog,
    
  ) { }

  ngOnInit(): void {

    this.id_proceso = parseInt(this.rutaActiva.snapshot.params.id)

    this.FuncionalidadInicial();
    this.ObtenerLista(this.id_proceso)
  }


  private dialogAbierto: boolean = false;

  dialogEdit(registro: any) {
    if (!this.dialogAbierto) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '550px';
      dialogConfig.height = '575px';
      dialogConfig.data = registro;
      dialogConfig.position = {
        top: '-650px',
        left: '40%',
      };
      dialogConfig.panelClass = 'custom-dialog';

      this.dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

      this.dialogRef.afterClosed().subscribe(update => {
        if (update === true) {
          this.FuncionalidadInicial();
          this.ObtenerLista(this.id_proceso);
        }
        this.dialogAbierto = false;
      });

      this.dialogAbierto = true;
    }
  }


  dialogRegistro() {
    if (!this.dialogAbierto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '555px';
    dialogConfig.position = {
      top: '-800px',
      left: '40%',
    };
    dialogConfig.data = { id_proceso: this.id_proceso };
  
    // Copia los cambios de aquí en la función
    const dialogRef = this.dialog.open(RegistrarDialogComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(update => {
      if (update === true) {
        this.ObtenerLista(this.id_proceso);
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

  


  FuncionalidadInicial() {
    this.rutaActiva.queryParams.subscribe(obj => {
      this.QueryParams = [obj];
      if (obj.estado_votacion === 'activo') {
        this.Btn_Agregar = true
      }

    })
  }

  ObtenerLista(id_proceso: number) {
    this.listaCandidatos = [];
    this.listaService.GetLista(id_proceso).subscribe(res => {

      if (res.message === 'ERROR') {
        return;
      }
      this.listaCandidatos = res.LISTA;
      this.HabilitarCards = true;

    })
  }


  
  GuardarImagenLocal(imagen: string) {
    localStorage.removeItem('imagen-lista')
    localStorage.setItem('imagen-lista', imagen)
  }

}
