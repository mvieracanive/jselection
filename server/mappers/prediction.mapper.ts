import { PredictionDto } from "../dtos/prediction.dto";
import { PredictionModel } from "../repositories/prediction.repository";

function modelToDto(model: PredictionModel): PredictionDto {
    const dato = model.data?.temperatura?.dato ?? []
    const sum = dato.reduce((acc: number, it: any) => acc + it.value, 0)

    let mediaTemperatura
    if (dato.length) {
        mediaTemperatura = sum / dato.length
    }
    
    return {
        mediaTemperatura,
        unidadTemperatura: 'G_CEL',
        probPrecipitacion: model.data?.probPrecipitacion ?? []
    }
}

export const predictionMapper = {
    modelToDto
}
