import express from 'express';
import BookController from '../controllers/BookController';
import { Schemas, ValidateSchema } from '../middlewares/ValidateSchema';

const router = express.Router();

// Post Book route
router.post('/create', ValidateSchema(Schemas.book.create), BookController.createBook);

// Get one Book route
router.get('/get/:bookId', BookController.readBook);

// Get all Books route
router.get('/get/', BookController.readAllBooks);

// Update Book route
router.patch('/update/:bookId', ValidateSchema(Schemas.book.update), BookController.updateBook);

// Delete Book route
router.delete('/delete/:bookId', BookController.deleteBook);

export = router;
