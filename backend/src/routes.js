const express = require('express');

const ProjectController = require('./controllers/ProjectController');

const routes = express.Router();

routes.get('/project', ProjectController.index);

routes.post('/project/new', ProjectController.create);

routes.put('/project/update', ProjectController.update);

routes.delete('/project/delete/:id', ProjectController.delete);

module.exports = routes;