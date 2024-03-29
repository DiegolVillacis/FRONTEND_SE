import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';
import { DialogsModule } from '../../../components/formscontrol/dialogs/dialogs.module';
import { AccionesBtnModule } from '../../../components/formscontrol/buttons/acciones-btn.module';

import { ListasRoutingModule } from './listas.routing';
import { ListasComponent } from './listas.component';
import { RegistrarDialogComponent } from './registrardialog/registrarDialog.component';
import { EditDialogComponent } from './editdialog/editDialog.component';


@NgModule({
  declarations: [
    ListasComponent,
    RegistrarDialogComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    ListasRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogsModule,
    AccionesBtnModule
  ]
})
export class ListasModule { }
