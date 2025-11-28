const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
const auth = require('../auth');
const { User } = require('../models'); // Use centralized models

// --- Registration Route ---
router.post('/register',
  [
    body('email').trim().isEmail().withMessage('A valid email is required.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        // Return a generic success-like response to prevent email enumeration.
        // A real application might also log this event or handle it differently.
        return res.status(200).json({ message: 'Registration request processed.' });
      }

      // Check if this is the first user. If so, make them an admin.
      const userCount = await User.count();
      const role = userCount === 0 ? 'admin' : 'user';

      const hashedPassword = await bcrypt.hash(password, 12); // Using a cost factor of 12
      await User.create({
        email,
        password: hashedPassword,
        role: role
      });

      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      next(error);
    }
  }
);

// --- Login Route ---
// The 'local' strategy is defined in backend/auth.js
router.post('/login',
  [
    body('email').isEmail().withMessage('A valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // passport.authenticate will handle the login logic
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // 'info' contains the message from the LocalStrategy (e.g., 'Incorrect email or password.')
        return res.status(401).json({ message: info.message || 'Authentication failed' });
      }
      // If authentication is successful, sign a token
      const token = auth.signToken(user);
      res.json({ 
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        } 
      });
    })(req, res, next);
  }
);

// --- Get Current User Profile Route ---
router.get('/me', auth.authenticate, (req, res) => {
  // auth.authenticate middleware attaches the user object to req.user
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role
  });
});

module.exports = router;
