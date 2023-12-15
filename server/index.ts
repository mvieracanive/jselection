import express, { Application } from 'express'
import { MunicipalityRouter } from './routes/municipality.routes';
import { PredictionRouter } from './routes/prediction.routes';
require('dotenv').config()

const app: Application = express();

const port: number = 3001;

app.use(MunicipalityRouter)
app.use(PredictionRouter)
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error!')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`)
});