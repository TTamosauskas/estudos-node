// Importa express ja instalado no package.json
const express = require('express');

// cria variável server contendo a funcao express que inicia um servidor
const server = express();

// Habilita o server a usar json
server.use(express.json());

//Cria variavel com array de usuarios
const usuarios = ["Diego", "Robson", "Victor"]

//Midlewere de log 
server.use((req, res, next) => {
  console.time("Request");

  console.log(`Método: ${req.method}; URL ${req.url}`);

  next();

 console.timeEnd("Request");

})

//Verifica se nome existe
function checkUserExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required'});
  }

  return next();
}

//verifica se index existe no Array
function checkUserInArray(req, res, next) {
const user = usuarios[req.params.index];

  if (!user) {
  
    return res.status(400).json({ error: 'User dones not exists'});
  }

  req.user = user;

  return next();
}

//CRUD - Create, Read, Update, Delete

//Cria usuario
server.post('/users', checkUserExist, (req, res) => {
  const { name } = req.body;
  usuarios.push(name);
  return res.json(usuarios);
})


//Edita Usuario
server.put('/users/:index', checkUserExist, checkUserInArray, (req, res) => {
  const {index} = req.params;
  const {name} = req.body;

  usuarios[index] = name;

  return res.json(usuarios);

})

//Exclusão de usuarios

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const {index} = req.params;

  usuarios.splice(index, 1);

  return res.json(usuarios);
})


//Lista usuarios
server.get('/users', checkUserInArray, (req, res) => {
  return res.json(usuarios);
})

// Lista 1 usuario
server.get('/users/:index', checkUserInArray, (req, res) => {
 
  // retorna um objeto json
  console.log(req)
  return res.json(req.user);

})

// define a porta do servidor
server.listen(3000);