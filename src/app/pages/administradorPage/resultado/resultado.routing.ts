import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultadoComponent } from './resultado.component';

const routes: Routes = [
  // { path: 'estudiantes', component: EstudiantesComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: '', component: ResultadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadoRoutingModule { }
