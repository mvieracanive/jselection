export interface Probabilidad {
    probabilidad: number,
    periodo: string
}

export class PredictionDto {
    mediaTemperatura!: number | undefined
    unidadTemperatura!: string
    probPrecipitacion!: Probabilidad[]  
}
