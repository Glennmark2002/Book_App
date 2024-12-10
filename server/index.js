import express from 'express'; 
import mongoose from 'mongoose';  
import bookRoute from './routes/book.route.js';
import cors from 'cors'; 

const mongoURL = 'mongodb+srv://glennmarkculibra:glennmarkculibra09@book-app.kvax9.mongodb.net/?retryWrites=true&w=majority&appName=Book-App'
const app = express(); 

app.use(express.json());
app.use(cors()); 

app.get('/', (req, res) => {
  return res.status(234).send('Running'); 
});

app.use('/books', bookRoute);  


mongoose.connect(mongoURL)
  .then(() => {
     console.log('App connected to database');
     app.listen(3000,  () => console.log('App is running on port: 3000'));  
  })
  .catch((error) => console.log(error))
