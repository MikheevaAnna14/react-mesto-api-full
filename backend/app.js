const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);
app.use(cors);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebreate

app.use(errorHandler);
// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   res
//     .status(err.statusCode)
//     .send({
//       message: statusCode === 500
//         ? 'На сервере произошла ошибкa'
//         : err.message,
//     });
//   next();
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
