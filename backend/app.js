const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const path = require('path');

// const publicDirectoryPath = path.join(__dirname, 'build');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const signupValidation = require('./middlewares/signupValidation');
const signinValidation = require('./middlewares/signinValitation');

const {
  login,
  logout,
  createUser,
} = require('./controllers/users');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(publicDirectoryPath));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);
app.use(cors);
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);
app.post('/signout', logout);
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
