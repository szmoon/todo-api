const pg = require('pg');

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

const requestController = {

  getProjects(req, res, next) {
    let results;
    pool.connect().then(client => {
      client.query('select * from projects').then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  getProject(req, res, next) {
    let projectId = req.params.id;
    // let results;
    pool.connect().then(client => {
      client.query('select * from projects where project_id=($1)',[projectId]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },
};


module.exports = requestController;
