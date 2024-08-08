import express from 'express';
import { config } from './config';

const app = express();
const port = config.PORT;


//Connect to MongoDB


// Express routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})