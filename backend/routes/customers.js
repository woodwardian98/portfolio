const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { Customer, User } = require('../models'); // Use centralized models
const { authenticate, requireAdmin } = require('../auth');

// All routes in this file are protected and require admin privileges
router.use(authenticate, requireAdmin);

// --- Get all customers ---
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      order: [['name', 'ASC']],
      include: [{ model: User, attributes: ['id', 'email'] }] // Show associated user if any
    });
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

// --- Get one customer by ID ---
router.get('/:id', [
  param('id').isInt().withMessage('ID must be an integer')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'email'] }]
    });

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    next(error);
  }
});

// --- Create a new customer ---
router.post('/', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('company').optional({ checkFalsy: true }).trim(),
    body('status').optional().isIn(['lead', 'active', 'archived']).withMessage('Invalid status'),
    body('notes').optional({ checkFalsy: true }).trim(),
    body('UserId').optional({ checkFalsy: true }).isInt().withMessage('UserId must be an integer')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, company, status, notes, UserId } = req.body;

      // Check if email is unique
      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer) {
        return res.status(409).json({ message: 'A customer with this email already exists' });
      }

      // If UserId is provided, check if the user exists
      if (UserId) {
        const user = await User.findByPk(UserId);
        if (!user) {
          return res.status(404).json({ message: 'Associated user not found' });
        }
      }

      const newCustomer = await Customer.create({ name, email, company, status, notes, UserId });
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

// --- Update a customer ---
router.put('/:id', [
    param('id').isInt().withMessage('ID must be an integer'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('company').optional({ checkFalsy: true }).trim(),
    body('status').optional().isIn(['lead', 'active', 'archived']).withMessage('Invalid status'),
    body('notes').optional({ checkFalsy: true }).trim(),
    body('UserId').optional({ checkFalsy: true }).isInt().withMessage('UserId must be an integer')
  ], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const customer = await Customer.findByPk(req.params.id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      const { name, email, company, status, notes, UserId } = req.body;
      
      // If email is being changed, check for uniqueness
      if (email && email !== customer.email) {
          const existingCustomer = await Customer.findOne({ where: { email } });
          if (existingCustomer) {
              return res.status(409).json({ message: 'A customer with this email already exists' });
          }
      }

      // If UserId is provided, check if the user exists
      if (UserId) {
        const user = await User.findByPk(UserId);
        if (!user) {
          return res.status(404).json({ message: 'Associated user not found' });
        }
      }
      
      await customer.update({ name, email, company, status, notes, UserId });
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

// --- Delete a customer ---
router.delete('/:id', [
  param('id').isInt().withMessage('ID must be an integer')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.destroy();
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
