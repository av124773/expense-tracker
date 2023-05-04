const express = require('express')

const app = express()
const PORT = 3001

app.get('/', (req, res) => {
  res.send('test route')
})

app.listen(PORT, () => {
  console.log(`This app is running on http://localhost:${PORT}`)
})
