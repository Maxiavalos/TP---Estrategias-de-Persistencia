const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const secretKey = 'est-per';

const carrerasRouter = require('./routes/carreras');
const materiasRouter = require('./routes/materias');
const docenteRouter = require('./routes/docentes');
const estudiantesRouter = require('./routes/estudiantes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/car', carrerasRouter);
app.use('/mat', materiasRouter);
app.use('/doc', docenteRouter);
app.use('/est', estudiantesRouter);

// Ruta del Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'unahur' && password === 'unahur') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '3h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
