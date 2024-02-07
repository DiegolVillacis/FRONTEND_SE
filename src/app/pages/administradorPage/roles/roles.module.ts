import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RolesRoutingModule } from './roles.routing';
import { RolesComponent } from './roles.component';

import { FormsAplicacionModule } from '../../../components/formscontrol/forms/forms-aplicacion.module';
import { AccionesBtnModule } from '../../../components/formscontrol/buttons/acciones-btn.module';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { DialogsModule } from '../../../components/formscontrol/dialogs/dialogs.module';
import { MaterialModule } from '../../../../material/material.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    RolesComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsAplicacionModule,
    AccionesBtnModule,
    DialogsModule,
    MatDialogModule
  ]
})
export class RolesModule { }
