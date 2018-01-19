const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { Pool, Client } = require('pg');
const client = new Client();

const pool = new Pool({
  host: 'baasu.db.elephantsql.com',
  port: 5432,
  user: 'ywucypzl',
  database: 'ywucypzl',
  password: '571Ri-SXJzz0PK9PSJw_P16qesaZaWFf',
  max: 10
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1)
});


const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


