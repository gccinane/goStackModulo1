const express = require('express')

const server = express();
server.use(express.json())

const users = ['deus', 'sata', 'sins']

function checkUserInArray(req, res, next) {
  const user = users[req.params.id]
  if(!user){
    return res.status(400).send({error: "user does not exist"})
  }

  req.user = user;
  return next();
}

function checkUserExists(req, res, next) {
  if(!req.body.user) {
    return res.status(400).send({error: "user name is required"})
  }

  return next();
}

server.get('/users/:id', checkUserInArray,(req, res) =>{
  
  return res.json(req.user)
})

server.get('/users', (req, res) =>{
  return res.send(users);
})

server.post('/users', checkUserExists,(req, res) => {
  const { name } = req.body;

  users.push(name)

  return res.json(name);
})

server.put('/users/:id',checkUserExists, (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  users[id] = name;
  return res.send(users);
})

server.delete('/users/:id', checkUserInArray, (req, res) => {
  const {id} = req.params;

  users.splice(id, 1);

  return res.send();
})

server.listen(3000);