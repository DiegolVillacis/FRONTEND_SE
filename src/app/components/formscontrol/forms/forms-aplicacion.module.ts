import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';

import { BotonesComponent } from './botones/botones.component';
import { UploadfilesComponent } from '../../../pages/administradorPage/uploadfiles/uploadfiles.component';

@NgModule({
  declarations: [BotonesComponent, UploadfilesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [BotonesComponent, UploadfilesComponent],
})
export class FormsAplicacionModule { }
