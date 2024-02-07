import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CandidatosRoutingModule } from './candidatos.routing';
import { CandidatosComponent } from './candidatos.component';

import { MaterialModule } from 'src/material/material.module';
import { FormsAplicacionModule } from '../../../components/formscontrol/forms/forms-aplicacion.module';
import { AccionesBtnModule } from '../../../components/formscontrol/buttons/acciones-btn.module';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { DialogsModule } from '../../../components/formscontrol/dialogs/dialogs.module';

@NgModule({
  declarations: [
    CandidatosComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    CandidatosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsAplicacionModule,
    AccionesBtnModule,
    DialogsModule
  ]
})
export class CandidatosModule { }
