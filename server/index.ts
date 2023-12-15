import express, { Application } from 'express'
import { MunicipalityRouter } from './routes/municipality.routes'
import { PredictionRouter } from './routes/prediction.routes'
import cors from 'cors'
require('dotenv').config()

const app: Application = express();

const port: number = 3001;

app.use(cors())
app.use(MunicipalityRouter)
app.use(PredictionRouter)

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`)
});