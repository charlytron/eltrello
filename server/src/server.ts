import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import * as usersController from "./controllers/users";
import * as boardsController from "./controllers/boards";
import bodyParser from 'body-parser';
import authMiddleware from './middlewares/auth';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is up, dog!');
});

app.post('/api/users', usersController.register);
app.post('/api/users/login', usersController.login);
app.get('/api/user', authMiddleware, usersController.currentUser);
app.get('/api/boards', authMiddleware, boardsController.getBoard);

io.on('connection', () => {
    console.log('a user connected');
});

mongoose.connect('mongodb://localhost:27017/eltrello').then(() => {
    console.log('connected to mongo');

    httpServer.listen(4001, () => {
        console.log('Server is listening on port 4001');
    });
});

