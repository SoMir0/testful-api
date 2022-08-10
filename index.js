const express = require('express');
const bodyParser = require('body-parser')
const db = require('./db.js')
const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/boards', db.getBoards)
app.get('/boards/:id', db.getBoardById)
app.post('/boards', db.createBoard)
app.put('/boards/:id', db.updateBoard)
app.delete('/boards/:id', db.deleteBoard)

app.listen(
    PORT,
    () => console.log(`the server is running on http://localhost:${PORT}`)
)
