import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material/material.module';

import { NavComponent } from '../components/nav-bar/nav.component';
import { MenuLateralComponent } from '../components/menu-lateral/menu-lateral.component';
import { InfoUserComponent } from '../components/cabeceraUser/info-user.component';
import { LoadingComponent } from '../components/formscontrol/loading/loading.component';

@NgModule({
  exports: [
    NavComponent,
    MenuLateralComponent,
    InfoUserComponent
  ],
  declarations: [
    NavComponent,
    MenuLateralComponent,
    InfoUserComponent,
    InfoUserComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }
