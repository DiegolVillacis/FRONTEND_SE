import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProcesoService } from 'src/app/services/proceso.service';
import { MatPaginator } from '@angular/material/paginator';
import { DataCentralService } from 'src/app/services/controlGeneralServices';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-proceso-electoral',
  templateUrl: './proceso-electoral.component.html',
  styleUrls: ['./proceso-electoral.component.css'],

})
export class ProcesoElectoralComponent implements OnInit, AfterViewInit {

  /**
   * Variables Formulario
   */
  public grupoFormulario: FormGroup;

  horaInicio: Date = new Date();
  horaFin: Date = new Date();

  /**
   * Variables Tabla de datos
   */
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  lregistros: any = [];
  filtroProcesos = '';

  constructor(
    private procesoService: ProcesoService,
    private dcentral: DataCentralService,
    private fb: FormBuilder,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.grupoFormulario = this.fb.group({
      id_votacion: [0, [Validators.required]],
      descripcion_votacion: ['', [Validators.maxLength(255)]],
      estado_votacion: [false],
      periodo_votacion: ['', [Validators.maxLength(255)]],
      fecha_votacion: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_final: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
    this.ObtenerDatosTabla();
    this.LimpiarCampos();
  }

  ObtenerDatosTabla() {
    this.procesoService.GetDatosTablaProcesoElectoral().subscribe((res) => {

      if (res.cod === "ERROR") {
        return;
      }
      this.dataSource = this.dcentral.llenarVariablesTabla(res.votaciones, this.paginator);
      this.lregistros = this.dataSource.data;

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtroProcesos = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  private dialogAbierto: boolean = false;
  abirDialgo(registro: any) {
    if (!this.dialogAbierto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.height = '625px';
    dialogConfig.data = registro;
    dialogConfig.position = {
      top: '-500px',
      left: '40%',
    };
    dialogConfig.panelClass = 'custom-dialog'; // Agrega una clase personalizada al diálogo
  
    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(update => {
      if (update === true) {
        this.ObtenerDatosTabla();
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



  GuardarProcesoElectoral(form) {
    this.procesoService.PostProcesoElectoral(form).subscribe(res => {
      if (res.cod == "ERROR") {
        return;
      }
      this.ObtenerDatosTabla();
      this.LimpiarCampos();
    })

  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      id_votacion: 0,
      descripcion_votacion: '',
      estado_votacion: false,
      periodo_votacion: '',
      fecha_votacion: '',
      hora_inicio: '',
      hora_final: ''
    })
  }
}
