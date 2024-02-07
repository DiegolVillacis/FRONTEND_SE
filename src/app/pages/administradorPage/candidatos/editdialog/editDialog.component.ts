import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidaturaService } from '../../../../services/candidatosServices';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './editDialog.component.html',
  styles: [
    ` .formularioRol {
      position: relative;
      z-index: 1;
    }

    /* Estilos CSS en tu archivo de estilos (por ejemplo, styles.scss) */
    .formulario {
        max-width: 400px; /* Ajusta según tus necesidades */
    }

    .inputs {
      width: 100%;
      margin-bottom: 10px; /* Espaciado inferior opcional */
      z-index: 10;
      position: relative;
      background: white;
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
    .checked {
    display: flex;
    align-content: left;
    align-items: left;
    width: 30%
  }

  .inputstodo{
    width: 100%;
    top: -26px;
    height: 1000px;
    margin-bottom: -23px; /* Espaciado inferior opcional */
    z-index: 10;
    position: relative;
    background: white;
    border: 2px solid #333;
    border-radius: 8px;
  }

    `
  ]
})
export class EditDialogComponent implements OnInit {

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

  constructor(
    private candidaturaService: CandidaturaService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.CandidatosForm.setValue({
      nombre_candidato: this.data.nombre_candidato,
      apellido_candidato: this.data.apellido_candidato,
      cargo_candidato: this.data.cargo_candidato,
    })
  }

  Guardar(form) {
    let data = {
      id_candidato: this.data.id_candidato,
      nombre_candidato: form.nombre_candidato,
      apellido_candidato: form.apellido_candidato,
      cargo_candidato: form.cargo_candidato,
      lista_candidato: this.data.lista_candidato
    }
    this.candidaturaService.EditarCandidato(data).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.CandidatosForm.reset();
    this.dialogRef.close(false);

  }

}
