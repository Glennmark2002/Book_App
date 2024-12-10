import express, { response } from 'express'; 
import mongoose from 'mongoose';  

import { Book } from './models/book.model.js';


const app = express(); 
app.use(express.json());

const mongoURL = 'mongodb+srv://glennmarkculibra:glennmarkculibra09@book-app.kvax9.mongodb.net/?retryWrites=true&w=majority&appName=Book-App'

app.get('/', (req, res) => {
  return res.status(234).send('Running'); 
});

app.post('/books', async (req, res) => {

  try {
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      return res.status(400).send({ message: 'Send all required fields: title, author publishYear' }); 
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    }

    const book = await Book.create(newBook); 

    return res.status(201).send(book); 

  } catch (error) {
    console.log(error);   
    res.status(500).send({ message: error.message })
  }

});   

app.get('/books', async (req, res) => {

  try {

    const books = await Book.find({});
    
    res.status(200).json({
      count: books.length,
      data: books
    }); 
    
  } catch (error) {
    console.log(error.message) ;  
    res.status(500).send({message: error.message});

  }

});  

// get the by the ID
app.get('/books/:id', async (req, res) => {

  try {
    
    const { id } = req.params;   
    const book = await Book.findById(id);
    
    return res.status(200).json(book); 
    
  } catch (error) {
    console.log(error.message) ;  
    res.status(500).send({message: error.message});
  }

});  
 

mongoose.connect(mongoURL)
  .then(() => {
     console.log('App connected to database');
     app.listen(3000,  () => console.log('App is running on port: 3000'));  
  })
  .catch((error) => console.log(error))
