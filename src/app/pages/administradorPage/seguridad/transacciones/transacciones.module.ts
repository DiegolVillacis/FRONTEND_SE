import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TransaccionesRoutingModule } from './transacciones.routing';
import { TransaccionesComponent } from './transacciones.component';

import { FormsAplicacionModule } from '../../../../components/formscontrol/forms/forms-aplicacion.module';
import { AccionesBtnModule } from '../../../../components/formscontrol/buttons/acciones-btn.module';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { DialogsModule } from '../../../../components/formscontrol/dialogs/dialogs.module';
import { MaterialModule } from 'src/material/material.module';

@NgModule({
  declarations: [
    TransaccionesComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    TransaccionesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsAplicacionModule,
    AccionesBtnModule,
    DialogsModule
  ]
})
export class TransaccionesModule { }
