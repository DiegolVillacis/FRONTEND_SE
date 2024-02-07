import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Listaestudiantil } from '../models/proceso.interface';

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  API_URL = environment.url + '/votoblock';

  constructor(private http: HttpClient) { }

  getVotosTotales() {
    return this.http.get<any>(`${this.API_URL}/ver`)
  }

  postVotoUsuario(data: Listaestudiantil) {
    return this.http.post<any>(`${this.API_URL}/registrar`, data)

  }

}
