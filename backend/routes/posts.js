const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { Post, User } = require('../models'); // Use centralized models
const auth = require('../auth');

// --- Get all PUBLISHED posts (Public)---
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { isPublished: true },
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['email'] }] // Include author's email
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// --- Get all posts, including drafts (Admin Only) ---
router.get('/all', auth.authenticate, auth.requireAdmin, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['id', 'email'] }]
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});


// --- Get a single published post by SLUG (Public) ---
router.get('/slug/:slug', [
  param('slug').notEmpty().withMessage('Slug cannot be empty')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findOne({
      where: { slug: req.params.slug, isPublished: true },
      include: [{ model: User, attributes: ['email'] }]
    });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found or not published' });
    }
  } catch (error) {
    next(error);
  }
});

// --- Get any post by ID (Admin only) ---
router.get('/id/:id', [
  param('id').isInt().withMessage('ID must be an integer')
], auth.authenticate, auth.requireAdmin, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'email'] }]
    });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    next(error);
  }
});


// --- Create a new post (Authenticated users) ---
router.post('/', auth.authenticate, [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('slug').trim().notEmpty().withMessage('Slug is required').isSlug().withMessage('Invalid slug format'),
    body('content').notEmpty().withMessage('Content is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, slug, content, description, isPublished } = req.body;

      // Check if slug is unique
      const existingPost = await Post.findOne({ where: { slug } });
      if (existingPost) {
        return res.status(409).json({ message: 'Slug already exists' });
      }

      const newPost = await Post.create({
        title,
        slug,
        content,
        description,
        isPublished: isPublished || false, // Default to false if not provided
        UserId: req.user.id
      });
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

// --- Update a post (Admin only) ---
router.put('/:id', auth.authenticate, auth.requireAdmin, [
    param('id').isInt().withMessage('ID must be an integer'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('slug').trim().notEmpty().withMessage('Slug is required').isSlug().withMessage('Invalid slug format'),
    body('content').notEmpty().withMessage('Content is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('isPublished').optional().isBoolean().withMessage('isPublished must be a boolean')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const { title, slug, content, description, isPublished } = req.body;

      // If the slug is being changed, ensure the new one is unique
      if (slug && slug !== post.slug) {
        const existingPost = await Post.findOne({ where: { slug } });
        if (existingPost) {
          return res.status(409).json({ message: 'Slug already exists' });
        }
      }

      await post.update({ title, slug, content, description, isPublished });
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
);

// --- Delete a post (Admin only) ---
router.delete('/:id', auth.authenticate, auth.requireAdmin, [
  param('id').isInt().withMessage('ID must be an integer')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
