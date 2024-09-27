const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const conversationsRouter = require('./conversations');

// Middleware to parse JSON requests
app.use(express.json());

// Serve conversations API
app.use('/api/conversations', conversationsRouter);

// Default route to serve images
app.use('/images', express.static('public/images'));

// Root route for API
app.get('/', (req, res) => {
  res.send('Welcome to the Learning API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
