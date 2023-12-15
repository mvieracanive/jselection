import { HttpException } from "../exceptions/HttpException"
import { predictionMapper } from "../mappers/prediction.mapper"
import { predictionyRepository } from "../repositories/prediction.repository"

export type TempUnit = 'G_CEL' | 'G_FAH'

export interface SearchQueryParams {
    municipalityCode: string
    tempUnit?: TempUnit
}

class PredictionService {
    async getPrediction(queryParams: SearchQueryParams) {
        try{
            const model = await predictionyRepository.readPrediction(queryParams.municipalityCode)
            
            const dto = predictionMapper.modelToDto(model)
            if (queryParams?.tempUnit === 'G_FAH') {
                dto.unidadTemperatura = 'G_FAH'

                dto.mediaTemperatura = dto.mediaTemperatura ? (dto.mediaTemperatura * 9/5) + 32 : undefined
            }

            return dto
        }
        catch(e) {
            return new HttpException(500, 'Internal Server Error')
        }
        
    }
}

export const predictionService = new PredictionService()
