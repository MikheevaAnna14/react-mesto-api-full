const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const signupValidation = require('./middlewares/signupValidation');
const signinValidation = require('./middlewares/signinValitation');

const {
  login,
  createUser,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);
app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);

app.use('*', auth, (req, res, next) => next(new NotFoundError('Несуществующий путь')));

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebreate

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res
    .status(err.statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибкa'
        : err.message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// fetch('/posts', {
//   method: 'GET',
//   credentials: 'include', // теперь куки посылаются вместе с запросом
// });
