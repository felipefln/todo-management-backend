const express = require('express');

const AuthenticationController = require('./controller/AuthenticationController');

const routes = express.Router();

routes.post('/register', AuthenticationController.create);
routes.post('/login', AuthenticationController.login);
routes.post('/logout', AuthenticationController.logout);
routes.post('/refresh_token', AuthenticationController.refresh);

module.exports = routes;