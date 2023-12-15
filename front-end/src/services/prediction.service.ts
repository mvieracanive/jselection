import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Probabilidad {
  value: number,
  periodo: string
}

export interface PredictionModel {
  mediaTemperatura: number | undefined
  unidadTemperatura: string
  probPrecipitacion: Probabilidad[]  
}


@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'http://localhost:3001/prediction'

  constructor(private http: HttpClient) { }

  getPrediction(municipalityCode: string, unit?: string): Observable<PredictionModel> {
    let queryUnit
    if (unit) {
      queryUnit=`?tempUnit=${ unit }`
    }
    return this.http.get<PredictionModel>(`${ this.apiUrl }/${ municipalityCode }${ queryUnit }`)
  }
}
