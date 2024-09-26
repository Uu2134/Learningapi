const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const conversationsRouter = require('./api/conversations');

// Middleware for JSON body parsing
app.use(express.json());

// Routes for conversations
app.use('/api/conversations', conversationsRouter);

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Learning API!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
