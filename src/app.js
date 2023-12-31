const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const sanitizer = require('perfect-express-sanitizer');

// Errors management - class
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// routers
const servicesRouter = require('./routes/services.routes');
const suggestionsRouter = require('./routes/suggestions.routes');
const requestsRouter = require('./routes/requests.routes');

const app = express();
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour',
});

// middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', limiter);

// routes
app.use('/api/v1/services', servicesRouter);
app.use('/api/v1/suggestions', suggestionsRouter);
app.use('/api/v1/requests', requestsRouter);

// errors
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
