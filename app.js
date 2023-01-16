
import express from './arcano.js'

const app = express();


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((req, res) => {
  res.status(404).send('Route not found');
})

export default app;