const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const requestCtrl = require('./requestController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// project routes
app.get('/projects', requestCtrl.getProjects); // get all projects
app.get('/projects/:id', requestCtrl.getProject); // get one project
app.post('/projects', requestCtrl.verifyUser, requestCtrl.addProject); // create new project
app.patch('/projects/:id', requestCtrl.updateProject); // update project name
app.delete('/projects/:id', requestCtrl.deleteProject); // delete project

// task routes
app.get('/tasks', requestCtrl.getTasks); // get all tasks
app.get('/tasks/:id', requestCtrl.getTask); // get one task
app.post('/tasks/:id', requestCtrl.verifyUser, requestCtrl.getProject, requestCtrl.addTask); // create new task at id of project
app.patch('/tasks/:id', requestCtrl.updateTask); // update task
app.delete('/tasks/:id', requestCtrl.deleteTask); // delete task
app.get('/tasks/project/:id', requestCtrl.tasksByProject); // get all tasks of specific project
app.get('/tasks/sorted/:id', requestCtrl.sortedTasks); // get tasks sorted by priority or due_date

// user routes
app.get('/users', requestCtrl.getUsers); // get all users
app.get('/users/:id', requestCtrl.getUser); // get one user
app.post('/users/verify', requestCtrl.verifyUser); // verify user by email and password
app.post('/users', requestCtrl.addUser); // create new user
app.patch('/users/:id', requestCtrl.updateUser); // update user
app.delete('/users/:id', requestCtrl.deleteUser); // delete user

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});


