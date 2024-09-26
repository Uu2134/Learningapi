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
  try {
    conversations = JSON.parse(data);
  } catch (parseError) {
    console.error('Error parsing conversations file:', parseError);
  }
});

// Get all topics
router.get('/topics', (req, res) => {
  if (conversations.length === 0) {
    return res.status(500).json({ message: 'No topics available.' });
  }

  const topics = conversations.map(conversation => ({
    topic: conversation.topic,
    image: `/images/${conversation.image}`,
  }));
  res.json(topics);
});

// Get conversations by topic
router.get('/:topic', (req, res) => {
  const topic = req.params.topic.toLowerCase();
  const conversation = conversations.find(c => c.topic.toLowerCase() === topic);

  if (conversation) {
    res.json(conversation);
  } else {
    res.status(404).json({ message: 'Topic not found' });
  }
});

module.exports = router;
