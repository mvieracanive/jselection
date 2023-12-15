import { MunicipalityDto } from "../dtos/municipality.dto";
import { MunicipalityModel } from "../repositories/municipality.repository";

function modelToDto(model: MunicipalityModel): MunicipalityDto {
    return {
        codigo: model.id.substring(2),
        nombre: model.nombre,
    }
}

function modelsToDto(models: MunicipalityModel[]): MunicipalityDto[] {
    return models.map(it => modelToDto(it))
}

export const municipalityMapper = {
    modelToDto,
    modelsToDto
}