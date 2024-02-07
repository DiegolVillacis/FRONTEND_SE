import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = environment.url + '/user';

  constructor(private http: HttpClient) { }
  
  /**
   * Lista de estudiantes
   * @returns 
   */
  ListaEstudiantes() {
    return this.http.get<any>(`${this.API_URL}/listae`)
  }

  ListaEstudiantesnovoto() {
    return this.http.get<any>(`${this.API_URL}/listaenovoto`)
  }

  ListaEstudiantesnovota() {
    return this.http.get<any>(`${this.API_URL}/listaevota`)
  }

 /**
   * Metodo para registra estudiante.
   * @param data Datos del form
   */
  RegistrarEstudiante(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrare`, data)
  }
  
  /**
   * Metodo para actualizar estudiante.
   * @param data Datos del form
   */
  ActualizarEstudiante(data: any) {
    return this.http.put<any>(`${this.API_URL}/updatee`, data)
  }

  eliminarRegistro(nametable: string, pkatributo: string): Observable<any> {
    const params = { nametable, pkatributo };
    return this.http.delete(`${this.API_URL}/registro`, { params });
  }

}
