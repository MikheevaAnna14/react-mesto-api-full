const DEFAULT_ALLOWED_METHODS = 'GET, PUT, PATCH, POST, DELETE';

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  // 'https://praktikum.tk',
  // 'http://praktikum.tk',
  'localhost:3030',
  'http://localhost:3030',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
