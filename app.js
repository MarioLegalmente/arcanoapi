
//import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import express from './arcano.js'

const app = express();

app.use((req, res, next) => {
  req.id = uuidv4();
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/healthy', (req, res) => {
  res.json({
    message:'Welcome to the ArcanoAPI',
  })
})

app.get('/request', (req, res) => {
  res.json({
    id: req.id,
  })
});

app.use((req, res) => {
  res.status(404).send('Route not found');
})

export default app;