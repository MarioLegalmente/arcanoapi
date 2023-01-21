
//import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser';
import express from './arcano.js'

const app = express();


const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) {
    res.status(401).json({
      error: 'Unauthorized'
    })
  }else{
    next();
  }
}

app.use(bodyParser.json())


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

app.post('/users/login', auth, (req, res) => {
  res.json({
    success: true
  })
})



app.post('/users', (req, res)=>{
  const {body = {} } = req;
  res.status(201).json({
    data: body,
  })
})

app.get('/users', (req, res) =>{
  const { query = {}} = req;
  res.json({
    data: [],
    meta: query,
});

})

app.use((req, res) => {
  res.status(404).send('Route not found');
})

export default app;