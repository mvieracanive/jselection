import axios from 'axios'

export interface MunicipalityModel {
    id_old: string
    id: string
    nombre: string
}

class MunicipalityRepository {
    async findMunicipalities(): Promise<MunicipalityModel[]> {
        const response = await axios.get(process.env.MAESTRO_MUNICIPALITIES_END_POINT!, {
            headers: {
                api_key: process.env.ESMET_API_KEY
            },
        })

        return response.data
    }
}

export const municipalityRepository = new MunicipalityRepository()