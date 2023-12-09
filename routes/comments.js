const express = require('express');
const { Comment, Post, User } = require('../models');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();


const router = express.Router();

// Create a new comment
router.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.create({
      text: req.body.text,
      UserId: req.user.id,
      PostId: post.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve comments for a post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { PostId: req.params.postId },
      include: [User]
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a comment
router.put('/comments/:commentId', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, UserId: req.user.id }
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or user not authorized' });
    }

    comment.text = req.body.text || comment.text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment
router.delete('/comments/:commentId', authMiddleware, async (req, res) => {
  try {
    const result = await Comment.destroy({
      where: { id: req.params.commentId, UserId: req.user.id }
    });

    if (result === 0) {
      return res.status(404).json({ message: 'Comment not found or user not authorized' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
