const express = require('express');
const fileUpload = require('express-fileupload')

const bodyParser = require('body-parser')
const cors = require('cors')

const path = require('path')
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

app.use(
  fileUpload({
    limits: {
      fileSize: 1024 * 1024 * 100
    },
    abortOnLimit: true,
    createParentPath: true,
  })
);

// Routes
app.get('/boards', db.getBoards)
app.get('/boards/:id', db.getBoardById)
app.post("/file", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.myFile;
  const path = __dirname + "/file/" + file.name;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
});
app.post('/boards', db.createBoard)
app.put('/boards/:id', db.updateBoard)
app.delete('/boards/:id', db.deleteBoard)

// Start the server
app.listen(
    PORT,
    () => console.log(`the server is running on http://localhost:${PORT}`)
)
