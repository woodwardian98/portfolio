const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const auth = require('./auth');
const db = require('./models'); // Centralized db instance from models/index.js
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/logger');

const app = express();
const port = process.env.PORT || 3000;

// --- Middleware Setup ---
// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:4321', // Astro dev server
  'https://woodwardian.net',
  'https://www.woodwardian.net',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(auth.initialize); // Initialize passport

// --- API Routers ---
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const customersRouter = require('./routes/customers');

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/customers', customersRouter);
app.use('/', indexRouter);

// --- Error Handling ---
app.use(errorHandler);

let server;

// The db object now comes from models/index.js, which has everything.
// The database schema is now managed by Sequelize migrations.
// We no longer call sync() here.
logger.info('Starting server...');
server = app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});


// --- Graceful Shutdown ---
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received, shutting down gracefully...`);
  if (server) {
    server.close(() => {
      logger.info('Server closed.');
      db.sequelize.close().then(() => {
        logger.info('Database connection closed.');
        process.exit(0);
      });
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
