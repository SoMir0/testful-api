const express = require('express');
const app = express();
const PORT = 8080;

const nameModule = require('./data/names.js');
const names = nameModule.names;

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

app.use(express.json());

app.get('/profile', (req, res) => {
    res.status(200).send({
        firstname: randomElement(names),
        lastname: 'Kirley',
	age: 25,
	employed: true,
	email: 'bobkirley@mail.co'
    })
})

app.post('/profile/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age, employed, email } = req.body;

    if (!firstname || !lastname) {
        res.status(418).send({ message: 'More info needed' })
    }

    res.send({
        message: `New profile added with the id of ${id} and the name ${firstname} ${lastname}`,
    });
})

app.listen(
    PORT,
    () => console.log(`the server is running on http://localhost:${PORT}`)
)
