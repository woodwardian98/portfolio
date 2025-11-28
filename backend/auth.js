const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_jwt_secret')) {
  console.error('FATAL ERROR: JWT_SECRET is not defined or is insecure in production.');
  process.exit(1);
}

// --- Passport Local Strategy for username/password login ---
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// --- JWT Strategy for token-based authentication ---
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret' // Use an environment variable for this!
};

passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
  try {
    // The payload now contains the full user object
    const user = await User.findByPk(jwt_payload.id);
    if (user) {
      // Attach the user object to the request
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// --- Helper function to sign JWTs ---
const signToken = (user) => {
  // Include user's role in the token payload
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, opts.secretOrKey, { expiresIn: '1h' });
};

// --- Middleware to protect routes ---
const authenticate = passport.authenticate('jwt', { session: false });

// --- Middleware to require admin role ---
const requireAdmin = (req, res, next) => {
  // This middleware should run AFTER the 'authenticate' middleware
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admins only' });
};

module.exports = {
  initialize: passport.initialize(),
  authenticate,
  requireAdmin,
  signToken
};
