const express = require('express')

const server = express();
server.use(express.json())

const users = ['deus', 'sata', 'sins']

server.get('/users/:id', (req, res) =>{
  const {id} = req.params;
  return res.json(users[id])
})

server.get('/users', (req, res) =>{
  return res.send(users);
})

server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name)

  return res.json(name);
})

server.put('/users/:id', (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  users[id] = name;
  return res.send(users);
})

server.delete('/users/:id',  (req, res) => {
  const {id} = req.params;

  users.splice(id, 1);

  return res.json(users)
})

server.listen(3000);