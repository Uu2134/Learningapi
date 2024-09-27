const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load conversations from JSON file
const conversationsFile = path.join(__dirname, 'conversations.json');

// Async function to read the file
const getConversations = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(conversationsFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading conversations file:', err);
        reject('Error reading conversations file');
      }
      resolve(JSON.parse(data));
    });
  });
};

// Get all topics with full conversation data
router.get('/topics', async (req, res) => {
  try {
    const conversations = await getConversations();
    const topics = conversations.map(conversation => ({
      topic: conversation.topic,
      imageUrl: conversation.imageUrl,
      dialogues: conversation.dialogues
    }));
    res.json(topics);
  } catch (error) {
    console.error('Error retrieving topics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get conversations by specific topic
router.get('/:topic', async (req, res) => {
  try {
    const conversations = await getConversations();
    const topic = req.params.topic;
    const conversation = conversations.find(c => c.topic.toLowerCase() === topic.toLowerCase());

    if (conversation) {
      res.json(conversation);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    console.error('Error retrieving conversation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
