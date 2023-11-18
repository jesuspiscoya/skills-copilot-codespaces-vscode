// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Import models
const Comment = require('./models/comment');

// Create express app
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Get all comments
app.get('/api/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    res.json(comments);
  });
});

// Get comment by id
app.get('/api/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    res.json(comment);
  });
});

// Create comment
app.post('/api/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.save().then(comment => {
    res.json(comment);
  });
});

// Update comment
app.put('/api/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, comment) => {
    res.json(comment);
  });
});

// Delete comment
app.delete('/api/comments/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    res.json(comment);
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});