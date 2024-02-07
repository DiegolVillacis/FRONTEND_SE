import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {

  API_URL = environment.url + '/candidatos';

  constructor(private http: HttpClient) { }


  ListaCandidatos(lista_candidato: number) {
    return this.http.get<any>(`${this.API_URL}/lista/${lista_candidato}`)
  }

  RegistrarCandidato(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrar`, data)
  }

  EditarCandidato(data: any) {
    return this.http.put<any>(`${this.API_URL}/editar`, data)
  }

}
