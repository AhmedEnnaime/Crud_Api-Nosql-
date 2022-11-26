import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/AuthorRoutes';
import bookRoutes from './routes/BookRoutes';

const router = express();

//Connect to database via mongoose
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to mongoDB');
        startServer();
    })
    .catch((err) => {
        Logging.error('Unable to connect: ');
        Logging.error(err);
    });

// Start the server only if mongo is connected
const startServer = () => {
    router.use((req, res, next) => {
        // Log the request
        Logging.info(`Incoming -> method: [${req.method}] - Url: [${req.url}] - Ip: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // Log the response
            Logging.info(`Incoming -> method: [${req.method}] - Url: [${req.url}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // Rules of Api
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    //Routes
    router.use('/authors', authorRoutes);
    router.use('/books', bookRoutes);

    //HealthCheck
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    //Error Handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    //Creating the server

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
