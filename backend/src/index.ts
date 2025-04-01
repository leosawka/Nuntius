import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import newsRoutes from './routes/news.routes'
import { AppDataSource } from './config/data-source'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api/news', newsRoutes)

app.get('/', (req, res) => {
  res.send('Nuntius backend is running!')
})

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected')

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
