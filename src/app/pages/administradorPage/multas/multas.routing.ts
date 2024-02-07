import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultasComponent } from './multas.component';

const routes: Routes = [
  // { path: 'estudiantes', component: EstudiantesComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: '', component: MultasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultasRoutingModule { }
