import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticaRoutingModule } from './estadistica.routing';
import { EstadisticaComponent } from './estadistica.component';

import { MaterialModule } from 'src/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    EstadisticaComponent
  ],
  imports: [
    CommonModule,
    EstadisticaRoutingModule,
    MaterialModule,
    MatTableModule,
    MatSortModule
  ]
})
export class EstadisticaModule { }
