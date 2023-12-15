import { Router } from 'express'
import { SearchQueryParams, TempUnit } from '../services/prediction.service'
import { predictionService } from '../services/prediction.service'

export const PredictionRouter = Router()

PredictionRouter.get('/prediction/:municipality', async (req, res) => {
    const queryParams: SearchQueryParams  = {
        municipalityCode: req.params.municipality
    }

    if (req.query?.tempUnit) {
        queryParams.tempUnit = req.query.tempUnit as TempUnit
    }
    
    const predictionDto = await predictionService.getPrediction(queryParams)

    res.send(predictionDto)
})
