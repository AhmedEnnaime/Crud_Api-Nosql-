import AuthorController from '../controllers/AuthorController';
import express from 'express';
import { Schemas, ValidateSchema } from '../middlewares/ValidateSchema';

const router = express.Router();

// Post Author route
router.post('/create', ValidateSchema(Schemas.author.create), AuthorController.createAuthor);

// Get one Author route
router.get('/get/:authorId', AuthorController.readAuthor);

// Get all Authors route
router.get('/get/', AuthorController.readAllAuthor);

// Update one Author route
router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), AuthorController.updateAuthor);

// Delete one Author route
router.delete('/delete/:authorId', AuthorController.deleteAuthor);

export = router;
