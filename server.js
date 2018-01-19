const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const requestCtrl = require('./requestController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/www')); 

app.get('/projects', requestCtrl.getProjects);

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


