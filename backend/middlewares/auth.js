const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new AuthorizationError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
