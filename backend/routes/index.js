const router = require('express').Router();

const routerUsers = require('./users');
const routerCards = require('./cards');

const signupValidation = require('../middlewares/signupValidation');
const signinValidation = require('../middlewares/signinValitation');
const {
  login,
  logout,
  createUser,
} = require('../controllers/users');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);
router.post('/signout', logout);
router.use('/users', auth, routerUsers);
router.use('/cards', auth, routerCards);

router.use('*', auth, (req, res, next) => next(new NotFoundError('Несуществующий путь')));

module.exports = router;
