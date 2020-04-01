const express = require('express');

const AuthenticationController = require('./controller/AuthenticationController');
const TodoController = require('./controller/TodoController');


const routes = express.Router();

routes.post('/register', AuthenticationController.create);
routes.post('/login', AuthenticationController.login);
routes.post('/logout', AuthenticationController.logout);
routes.post('/refresh_token', AuthenticationController.refresh);

routes.get('/todos', TodoController.index);
routes.post('/todos', TodoController.create);
routes.delete('/todos/:id', TodoController.delete);

module.exports = routes;