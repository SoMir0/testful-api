require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
})

const getBoards = (request, response) => {
  pool.query('SELECT * FROM boards ORDER BY id ASC', (error, results) => {
    if(error) throw error;
    response.status(200).json(results.rows);
  })
}

const getBoardById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM boards WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createBoard = (request, response) => {
  const { content } = request.body

  pool.query('INSERT INTO boards (content) VALUES ($1) RETURNING *', [content], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Board added with ID: ${results.rows[0].id}`)
  })
}

const updateBoard = (request, response) => {
  const id = parseInt(request.params.id)
  const { content } = request.body

  pool.query(
    'UPDATE boards SET content = $1 WHERE id = $2',
    [content, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Board modified with ID: ${id}`)
    }
  )
}

const deleteBoard = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM boards WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Board deleted with ID: ${id}`)
  })
}

module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
}
