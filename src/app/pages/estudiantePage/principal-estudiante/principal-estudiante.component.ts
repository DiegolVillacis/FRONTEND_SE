import { Component, OnInit } from '@angular/core';
import { Votacion, Listaestudiantil } from 'src/app/models/proceso.interface';
import { ProcesoService } from '../../../services/proceso.service';
import { VotosService } from '../../../services/votoService';
import { DataCentralService } from '../../../services/controlGeneralServices';
import { User } from '../../../models/user.iterface';
import { votacionValueDefault } from '../../../models/proceso.interface';
import { LoginService } from '../../../services/loginServices';

@Component({
  selector: 'app-principal-estudiante',
  templateUrl: './principal-estudiante.component.html',
  styleUrls: ['./principal-estudiante.component.sass']
})
export class PrincipalEstudianteComponent implements OnInit {

  votaciones: Votacion = votacionValueDefault;

  showVotos: boolean = true;

  public get user(): User {
    return this.dcentral.user
  }

  constructor(
    private procesoService: ProcesoService,
    private votoService: VotosService,
    private loginService: LoginService,
    private dcentral: DataCentralService
  ) { }

  ngOnInit() {
    this.procesoService.infoProcesoToUsuarios().subscribe(
      votaciones => { this.votaciones = votaciones.VOTACION }
    )
  }

  saveVoto(option_lista: Listaestudiantil) {
    option_lista.contenido = '';
    this.votoService.postVotoUsuario(option_lista).subscribe(res => {

      if (res.cod === "ERROR") {
        return;
      }
      this.showVotos = false;
      delete this.votaciones;
      this.loginService.logout();
    })
  }

}
