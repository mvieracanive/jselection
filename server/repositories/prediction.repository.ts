import axios from 'axios'

export interface PredictionModel {
    data: Record<string, any>
    metadatos: Record<string, any>
}

class PredictionRepository {
    async readPrediction(municipalityCode: string): Promise<PredictionModel> {
        const firstResponse = await axios.get(`${ process.env.DAILY_PREDICTION_END_POINT! }/${ municipalityCode }`, {
            headers: {
                api_key: process.env.ESMET_API_KEY
            },
        })

        const redirectUrlDatos = firstResponse.data.datos
        const redirectUrlMetadatos = firstResponse.data.metadatos

        const secondResponseDatos = await axios.get(redirectUrlDatos)
        const secondResponseMetadatos = await axios.get(redirectUrlMetadatos)

        return {
            data: {
                probPrecipitacion: secondResponseDatos.data?.[0]?.prediccion?.dia?.[0]?.probPrecipitacion,
                temperatura: secondResponseDatos.data?.[0]?.prediccion?.dia?.[0]?.temperatura
            },
            metadatos: secondResponseMetadatos.data
        }

    }
}

export const predictionyRepository = new PredictionRepository()
