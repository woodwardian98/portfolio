const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const auth = require('../auth');
const logger = require('../config/logger');

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60 * 1000, // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX) || 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute'
});

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/submit',
  limiter,
  body('name').isLength({ min: 1 }).trim().escape(),
  body('message').isLength({ min: 1 }).trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, message } = req.body;
    logger.info(`Received message from ${name}: ${message}`);

    res.status(200).send('Message received successfully!');
  }
);

router.get('/profile', auth.authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}` });
});

module.exports = router;
