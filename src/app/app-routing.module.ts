import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { ErrorPageComponent } from './pages/errorsPage/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},

  // Seguridad
  { path: 'opcionesmenu', loadChildren: () => import('src/app/components/opcionesmenu/opcionesmenu.module').then(m => m.OpcionesMenuModule)},
  { path: 'roles', loadChildren: () => import('src/app/pages/administradorPage/roles/roles.module').then(m => m.RolesModule)},
  { path: 'transacciones', loadChildren: () => import('src/app/pages/administradorPage/seguridad/transacciones/transacciones.module').then(m => m.TransaccionesModule)},

  // ADMINISTRADOR
  { path: 'candidatos/:id', loadChildren: () => import('src/app/pages/administradorPage/candidatos/candidatos.module').then(m => m.CandidatosModule)},
  { path: 'estudiantes', loadChildren: () => import('src/app/pages/administradorPage/usuarios/estudiantes.module').then(m => m.EstudiantesModule)},
  //REPORTES
  { path: 'multas', loadChildren: () => import('src/app/pages/administradorPage/multas/multas.module').then(m => m.MultasModule)},
  { path: 'resultado', loadChildren: () => import('src/app/pages/administradorPage/resultado/resultado.module').then(m => m.ResultadoModule)},
  { path: 'votos-live', loadChildren: () => import('src/app/pages/administradorPage/votos/estadistica.module').then(m => m.EstadisticaModule)},

  { path: 'proceso-electoral', loadChildren: () => import('src/app/pages/administradorPage/votaciones/proceso-electoral.module').then(m => m.ProcesoElectoralModule)},
  { path: 'listas/:id', loadChildren: () => import('src/app/pages/administradorPage/listas/listas.module').then(m => m.ListasModule)},
  
  // estudiantes
  { path: 'home-estudiante', loadChildren: () => import('src/app/pages/estudiantePage/principal-estudiante/principal-estudiante.module').then(m => m.PrincipalEstudianteModule)},
  
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

