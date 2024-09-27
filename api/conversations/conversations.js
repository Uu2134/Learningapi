const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load conversations from JSON file
const conversationsFile = path.join(__dirname, 'conversations.json');
let conversations = [];

// Read the JSON file when the server starts
fs.readFile(conversationsFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading conversations file:', err);
    return;
  }
  conversations = JSON.parse(data);
});

// Get all topics with full conversation data
router.get('/topics', (req, res) => {
  const topics = conversations.map(conversation => ({
    topic: conversation.topic,
    imageUrl: conversation.imageUrl,
    dialogues: conversation.dialogues
  }));
  res.json(topics);
});

// Get conversations by specific topic
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
