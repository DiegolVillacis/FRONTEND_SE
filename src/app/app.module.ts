import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Cambiar el local de la APP
import localEsEC from '@angular/common/locales/es-EC'
import { registerLocaleData } from '@angular/common'
registerLocaleData(localEsEC)

// GUARDS
import { AuthGuard } from '../guards/auth.guard';

// SERVICIOS
import { TokenInterceptorService } from './services/tokenGenerateServices';
import { HttpErrorInterceptorService } from './services/controlErroresServices';
import { VotosService } from './services/votoService';
import { LoginService } from './services/loginServices';
import { UserService } from './services/userServices';
import { ProcesoService } from './services/proceso.service';
import { ListaService } from './services/lista.service';
import { CandidaturaService } from './services/candidatosServices';

// COMPONENTES
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

// Modules
import { MaterialModule } from '../material/material.module';
import { SharedModule } from './models/shared.module';
import { LoginModule } from './pages/loginPage/login.module';
import { MatSortModule } from '@angular/material/sort';


import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LoginModule,
    MaterialModule,
    SharedModule,
    MatSortModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    

  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    VotosService,
    LoginService,
    UserService,
    ProcesoService,
    ListaService,
    CandidaturaService,
    {
      provide: LOCALE_ID, useValue: 'es-EC'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }