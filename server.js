const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const requestCtrl = require('./requestController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/www')); 

// project routes
app.get('/projects', requestCtrl.getProjects); // get all projects
app.get('/projects/:id', requestCtrl.getProject); // get one project
app.post('/projects', requestCtrl.addProject); // create new project
app.patch('/projects/:id', requestCtrl.updateProject); // update project name
// app.delete('/projects/:id', requestCtrl.deleteProject); // delete project

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

