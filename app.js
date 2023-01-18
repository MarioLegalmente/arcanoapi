
//import express from 'express'
import express from './arcano.js'


const app = express();


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/healthy', (req, res) => {
  res.json({
    message:'Welcome to the ArcanoAPI',
  })
});

app.use((req, res) => {
  res.status(404).send('Route not found');
})

export default app;