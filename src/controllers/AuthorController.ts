import Author from '../models/Author';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

// Create Author
const createAuthor: RequestHandler = (req, res, next) => {
    const { name } = req.body;
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((err) => res.status(500).json({ err }));
};

// Get one Author
const readAuthor: RequestHandler = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found' })))
        .catch((err) => res.status(500).json({ err }));
};

// Get all Authors
const readAllAuthor: RequestHandler = (req, res, next) => {
    return Author.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((err) => res.status(500).json({ err }));
};

// Update Author
const updateAuthor: RequestHandler = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);
                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};

// Delete Author
const deleteAuthor: RequestHandler = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(200).json({ message: 'Author deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((err) => res.status(500).json({ err }));
};

export default { createAuthor, readAuthor, readAllAuthor, updateAuthor, deleteAuthor };
