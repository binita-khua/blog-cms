const express = require('express');
const { Post, User } = require('../models');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();


const router = express.Router();

// Create a new post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a post
router.put('/:id', authMiddleware, async (req, res) => {
    try {
      const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } });
      if (!post) {
        return res.status(404).json({ message: 'Post not found or user not authorized' });
      }
  
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      await post.save();
  
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a post
  router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const result = await Post.destroy({ where: { id: req.params.id, UserId: req.user.id } });
      if (result === 0) {
        return res.status(404).json({ message: 'Post not found or user not authorized' });
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
