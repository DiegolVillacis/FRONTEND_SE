import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcesoService } from '../../../../services/proceso.service';
import { DataCentralService } from '../../../../services/controlGeneralServices';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './editDialog.component.html',
  styles: [
    ` .formularioRol {
        position: relative;
        text-align: center ;
        z-index: 10;
        
      }


      /* Estilos CSS en tu archivo de estilos (por ejemplo, styles.scss) */
      .formulario {
        max-width: 600px; /* Ajusta según tus necesidades */
        text-align: center ;
        z-index: 10;
        position: relative;
      }

      .titulo {
        position: center;
        text-align: center ;
        background: white ;
        color: black;
        width: 85%;
        z-index: 10;
      }
      

      .inputs {
        width: 90%;
        margin-bottom: 10px; /* Espaciado inferior opcional */
        z-index: 10;
        position: relative;
      }

      .form{
        z-index: 10;
        position: center;
        width: 100%;
      }

      .custom-icon {
        color: #3366ff; /* Cambia el color del ícono según tus preferencias */
        cursor: pointer; /* Agrega un cursor señalando que el ícono es interactivo */
        position: relative;
      }
    `
  ]
})
export class EditDialogComponent implements OnInit {

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  constructor(
    private procesoService: ProcesoService,
    private dcentral: DataCentralService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id_votacion: ['', [Validators.required]],
      descripcion_votacion: ['', [Validators.maxLength(255)]],
      estado_votacion: [this.data.estado_votacion === true], // Asegura que sea un booleano
      periodo_votacion: ['', [Validators.maxLength(255)]],
      fecha_votacion: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_final: ['', [Validators.required]]
    });
    this.SetData();
  }

  SetData() {
    console.log('Valor de this.data.estado_votacion:', this.data.estado_votacion);
    this.grupoFormulario.setValue({
      id_votacion: this.data.id_votacion,
      descripcion_votacion: this.data.descripcion_votacion,
      estado_votacion: this.data.estado_votacion,
      periodo_votacion: this.data.periodo_votacion,
      fecha_votacion: this.data.fecha_votacion,
      hora_inicio: this.data.hora_inicio,
      hora_final: this.data.hora_final
    });
    console.log('Valor después de setValue:', this.grupoFormulario.get('estado_votacion').value);

  }

  Guardar(form) {
    this.procesoService.PutProcesoElectoral(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      id_votacion: this.data.id_votacion,
      descripcion_votacion: '',
      estado_votacion: false,
      periodo_votacion: this.data.periodo_votacion,
      fecha_votacion: '',
      hora_inicio: '',
      hora_final: ''
    })
    this.dialogRef.close(false);
  }


}
