
const express = require('express')
const app = express()
const studentsRoutes = require ('./routes/studentsRoutes.js')
const teachersRoutes = require ('./routes/teachersRoutes.js')

const hostname = '127.0.0.1'
const port = 5000
const server = app

app.get('/', (req, res) => {
  res.send('Hello Arcanoapi!')
})

app.use('/students', studentsRoutes)
app.use('/teachers', teachersRoutes)

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

