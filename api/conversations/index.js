const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load conversations from JSON file
const conversationsFile = path.join(__dirname, 'conversations.json');
let conversations = [];

fs.readFile(conversationsFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading conversations file:', err);
    return;
  }
  conversations = JSON.parse(data);
});

// Get all topics
router.get('/topics', (req, res) => {
  const topics = conversations.map(conversation => ({
    topic: conversation.topic,
    image: `/images/${conversation.image}`,
  }));
  res.json(topics);
});

// Get conversations by topic
router.get('/:topic', (req, res) => {
  const topic = req.params.topic;
  const conversation = conversations.find(c => c.topic.toLowerCase() === topic.toLowerCase());

  if (conversation) {
    res.json(conversation);
  } else {
    res.status(404).json({ message: 'Topic not found' });
  }
});

module.exports = router;
