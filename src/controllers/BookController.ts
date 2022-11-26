import Book from '../models/Book';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';

// Create Book
export const createBook: RequestHandler = (req, res, next) => {
    const { title, author } = req.body;
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((err) => res.status(500).json({ err }));
};

// Get one Book
export const readBook: RequestHandler = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .populate('author')
        .select('-__v')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Book not found' })))
        .catch((err) => res.status(500).json({ err }));
};

// Get all Books
export const readAllBooks: RequestHandler = (req, res, next) => {
    return Book.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((err) => res.status(500).json({ err }));
};

// Update Book
export const updateBook: RequestHandler = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);
                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};

// Delete Book
export const deleteBook: RequestHandler = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(200).json({ message: 'Book deleted' }) : res.status(404).json({ message: 'Book not found' })))
        .catch((err) => res.status(500).json({ err }));
};

export default { createBook, readBook, readAllBooks, updateBook, deleteBook };
