import { HttpException } from "../exceptions/HttpException"
import { municipalityMapper } from "../mappers/municipality.mapper"
import { municipalityRepository } from "../repositories/municipality.repository"

export interface SearchQueryParams {
    prefix: string
}

class MunicipalityService {
    async getMunicipalities(queryParams?: SearchQueryParams) {
        try{
            const models = await municipalityRepository.findMunicipalities()

            if (queryParams) {
                return municipalityMapper.modelsToDto(
                    models
                    .filter(it => it.nombre.startsWith(queryParams.prefix))
                )
            }

            return municipalityMapper.modelsToDto(models)
        }
        catch(e) {
            return new HttpException(500, 'Internal Server Error')
        }
        
    }
}

export const municipalityService = new MunicipalityService()
