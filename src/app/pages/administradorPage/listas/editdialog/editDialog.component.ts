import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './editDialog.component.html',
  styleUrls: ['./editDialog.component.css']
})
export class EditDialogComponent implements OnInit {

  public actualizarListaForm: FormGroup;

  //imagen
  logo: any;
  imagen_default: boolean = false;

  constructor(
    private listaService: ListaService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.contenido != null) {
      this.logo = this.data.contenido;
      this.imagen_default = true;
    }
    this.actualizarListaForm = this.formBuilder.group({
      id: this.data.id,
      image: this.data.contenido,
      nom_lista: this.data.nom_lista,
      descripcion: this.data.descripcion,
      estado: this.data.estado,
      id_proceso: this.data.id_proceso
    })
  }

  Guardar(form) {
    let data = {
      id: this.data.id,
      nom_lista: form.nom_lista,
      descripcion: form.descripcion,
      estado: form.estado,
      id_proceso: this.data.id_proceso
    }

    const formData = new FormData();
    formData.append('image', this.actualizarListaForm.get('image').value);

    this.listaService.ActualizarLista(data).subscribe(res => {

      if (res.cod === "ERROR") {
        return;
      }
      
      if (res.id !== null && form.imagen !== "" && res.cod == 'OK') { 
        this.listaService.SubirImagen(formData, res.id).subscribe(response => {
          this.dialogRef.close(true);
        });
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.actualizarListaForm.reset();
    this.actualizarListaForm.setValue({
      id: this.data.id,
      image: [''],
      nom_lista: '',
      descripcion: '',
      estado: false,
      id_proceso: this.data.id_proceso
    })
    this.dialogRef.close(true);

  }

 //

  async fileChange(element) {
    if (element.target.files.length > 0) {
      const file = element.target.files[0];
      this.actualizarListaForm.get('image').setValue(file);

      this.logo = await this.getBase64(file).then(
        data => { return data }
      ) || '';

      this.imagen_default = true
    }
  }

  async getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  
}
