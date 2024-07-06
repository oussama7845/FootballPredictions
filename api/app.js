const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const predictionsRouter = require('./routes/prediction');
const gamesRouter = require('./routes/game');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'], // Ajoutez 'Authorization' ici
  credentials: true, // Autorise l'envoi de cookies depuis l'origine spécifiée
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', predictionsRouter);
app.use('/', gamesRouter);

module.exports = app;
