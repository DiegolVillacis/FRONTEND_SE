import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MultasRoutingModule } from './multas.routing';
import { MultasComponent } from './multas.component';

import { MaterialModule } from 'src/material/material.module';
import { FormsAplicacionModule } from '../../../components/formscontrol/forms/forms-aplicacion.module';
import { AccionesBtnModule } from '../../../components/formscontrol/buttons/acciones-btn.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { DialogsModule } from '../../../components/formscontrol/dialogs/dialogs.module';


@NgModule({
  declarations: [
    MultasComponent,
  ],
  imports: [
    CommonModule,
    MultasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AccionesBtnModule,
    FormsAplicacionModule,
    PipesModule,
    DialogsModule
  ]
})
export class MultasModule { }
