const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db.js')
const app = express();
const PORT = 8080;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
}));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get('/boards', db.getBoards)
app.get('/boards/:id', db.getBoardById)
app.post('/boards', db.createBoard)
app.put('/boards/:id', db.updateBoard)
app.delete('/boards/:id', db.deleteBoard)

// Start the server
app.listen(
    PORT,
    () => console.log(`the server is running on http://localhost:${PORT}`)
)
