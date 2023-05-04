const express = require('express')
const mongoose =  require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = 3001

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => {
  res.send('test route')
})

app.listen(PORT, () => {
  console.log(`This app is running on http://localhost:${PORT}`)
})
