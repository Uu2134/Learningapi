const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const conversationsRouter = require('./api/conversations');

app.use(express.json());
app.use('/api/conversations', conversationsRouter);
app.use('/images', express.static('public/images'));

// Default route for API
app.get('/', (req, res) => {
  res.send('Welcome to the Learning API!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
