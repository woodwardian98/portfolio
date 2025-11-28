const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // In a production environment, we would not want to send the stack trace.
    // We can use a condition like: stack: process.env.NODE_ENV === 'production' ? null : err.stack
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
