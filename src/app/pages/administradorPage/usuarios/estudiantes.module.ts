import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EstudiantesRoutingModule } from './estudiantes.routing';
import { EstudiantesComponent } from './estudiantes.component';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { RegistrarDialogComponent } from './registrardialog/registrarDialog.component';

import { MaterialModule } from 'src/material/material.module';
import { FormsAplicacionModule } from '../../../components/formscontrol/forms/forms-aplicacion.module';
import { AccionesBtnModule } from '../../../components/formscontrol/buttons/acciones-btn.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { DialogsModule } from '../../../components/formscontrol/dialogs/dialogs.module';


@NgModule({
  declarations: [
    EstudiantesComponent,
    EditDialogComponent,
    RegistrarDialogComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AccionesBtnModule,
    FormsAplicacionModule,
    PipesModule,
    DialogsModule
  ]
})
export class EstudiantesModule { }
