import dotenv from 'dotenv'

import { connectDB } from './db/index.js'
import { app } from './app.js'

dotenv.config({
  path: './config.env',
})

connectDB()
  .then(() => {
    app.on('error', (err) => {
      console.log('ERROR ::', err)
      throw err
    })
  })
  .catch((err) => {
    console.log('connection error', err)
  })

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`)
})
