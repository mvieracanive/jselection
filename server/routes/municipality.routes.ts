import { Router } from 'express'
import { municipalityService } from '../services/municipality.service'

export const MunicipalityRouter = Router()

MunicipalityRouter.get('/municipality', async (req, res) => {
    let queryParams
    if (req.query?.prefix) {
        queryParams = {
            prefix: req.query.prefix as string
        }
    }
    
    const municipalityDtos = await municipalityService.getMunicipalities(queryParams)

    res.send(municipalityDtos)
})

