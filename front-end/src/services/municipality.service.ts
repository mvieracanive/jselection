import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MunicipalityModel {
  nombre: string
  codigo: string
}

@Injectable({
  providedIn: 'root'
})

export class MunicipalityService {

  private apiUrl = 'http://localhost:3001/municipality'

  constructor(private http: HttpClient) { }

  getMunicipalities(municipalityPartialName: string): Observable<MunicipalityModel[]> {

    return this.http.get<MunicipalityModel[]>(`${ this.apiUrl }?prefix=${ municipalityPartialName }`)
    
  }
}
