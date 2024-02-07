import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { permisosSistema } from 'src/app/models/user.iterface';
import { DataCentralService } from 'src/app/services/controlGeneralServices';

@Component({
  selector: 'btn-eliminar',
  templateUrl: './eliminar.component.html'
})
export class EliminarComponent {

  @Input() isButtom: boolean = true;

  @Input() label: string = 'Eliminar';

  @Input() nameTable: string = '';
  @Input() idreg: string = '';

  // @Input() pkatributo: string = 'id';
  @Input() pkatributo: string;

  @Output() onDelete: EventEmitter<any> = new EventEmitter()

  public get permisos(): permisosSistema {
    return this.dcentral.permisos
  }

  constructor(
    private dcentral: DataCentralService,
  ) { }

  openDialog() {
    if (this.nameTable === '' && this.idreg === '') {
      return this.dcentral.mostrarmsgerror('Código de registro no encontrado para eliminar');
    }

    console.log('nameTable:', this.nameTable);
    console.log('idreg:', this.idreg);
    console.log('pkatributo:', this.pkatributo);

    this.dcentral.EliminarRegistro(this.idreg, this.nameTable, this.pkatributo).subscribe(
      data => {
        console.log('EliminarRegistro Exitoso:');
      },
      err => {
        console.error('EliminarRegistro Error:');
      },
      () => {
        console.log('EliminarRegistro Completado');
        this.onDelete.emit();
      }
    );

  }


}

/**
 * @title Dialog elements
 */
@Component({
  selector: 'dialog-elminar',
  template: `
    <h2 style="text-align: center;" mat-dialog-title>⚠ Alerta!</h2>
    <div style="text-align: center;" mat-dialog-content>Seguro en eliminar este registro.</div> 
    <br>
    <div mat-dialog-actions class="d-flex justify-align-center">
      <button mat-button class="btn btn-primary mx-3" (click)="dialogRef.close(true)">Confirmar</button>
      <button mat-button class="btn btn-danger mx-3" (click)="dialogRef.close(false)">Salir</button>
    </div>
  `,
})
export class DialogEliminar {
  constructor(
    public dialogRef: MatDialogRef<DialogEliminar>
  ) { }

}
