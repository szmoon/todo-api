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
  // PROJECT QUERIES
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
    pool.connect().then(client => {
      client.query('select * from projects where project_id=($1)',[req.params.id]).then(result => {
        if (!result.rows[0]) {
          res.status(418).send('Task must be created in an existing project');
          throw 'Task must be created in an existing project';
        } else {
          client.release();
          return res.json(result.rows);
        }
      }).then( result => {
        next();
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
    });
  },

  addProject(req, res, next) {
    pool.connect().then(client => {
      client.query('insert into projects (project_name) values ($1)',[req.body.projectName]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  updateProject(req, res, next) {
    pool.connect().then(client => {
      client.query('update projects set project_name = ($1) where project_id = ($2)',[req.body.projectName, req.params.id]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  deleteProject(req, res, next) {
    pool.connect().then(client => {
      client.query('delete from projects where project_id = ($1)',[req.params.id]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },
  // TASK QUERIES
  getTasks(req, res, next) {
    let results;
    pool.connect().then(client => {
      client.query('select * from tasks').then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  getTask(req, res, next) {
    pool.connect().then(client => {
      client.query('select * from tasks where task_id=($1)',[req.params.id]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  addTask(req, res, next) {
    pool.connect().then(client => {
      client.query('insert into tasks (summary, description, due_date, priority, project_id) values ($1, $2, $3, $4, $5)',[req.body.summary, req.body.description, req.body.due_date, req.body.priority, req.params.id])
      .then(result => {
        client.release();
        return result.rows;
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  updateTask(req, res, next) {
    pool.connect().then(client => {
      client.query('update tasks set summary = ($1), description = ($2), due_date = ($3), priority = ($4), project_id = ($5) where task_id = ($6)',[req.body.summary, req.body.description, req.body.due_date, req.body.priority, req.body.project_id, req.params.id])
      .then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  deleteTask(req, res, next) {
    pool.connect().then(client => {
      client.query('delete from tasks where task_id = ($1)',[req.params.id]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  tasksByProject(req, res, next) {
    let results;
    pool.connect().then(client => {
      client.query('select * from tasks where project_id = ($1) order by priority DESC',[req.params.id]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  sortedTasks(req, res, next) {
    let results;
    pool.connect().then(client => {
      client.query('select * from tasks order by ($1) DESC',[req.params.id]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

   // USER QUERIES
   getUsers(req, res, next) {
    let results;
    pool.connect().then(client => {
      client.query('select * from users').then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  getUser(req, res, next) {
    pool.connect().then(client => {
      client.query('select * from users where user_id=($1)',[req.params.id]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  verifyUser(req, res, next) {
    pool.connect().then(client => {
      client.query('select * from users where email = ($1)',[req.body.email]).then(result => {
        if (!result.rows[0]) {
          res.status(418).send('User email does not exist');
          throw 'User email does not exist';
        } else {
          if (req.body.password === result.rows[0].password) {
            client.release();
            return req;
          } else {
            res.status(418).send('Password does not match user email');
            throw 'Password does not match user email';
          }
        }
      }).then( result => {
        next();
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
    });
  },

  addUser(req, res, next) {
    pool.connect().then(client => {
      client.query('insert into users (first_name, last_name, email, password) values (($1),($2),($3),($4))',[req.body.first_name, req.body.last_name, req.body.email, req.body.password])
      .then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  updateUser(req, res, next) {
    pool.connect().then(client => {
      client.query('update users set first_name = ($1), last_name = ($2), email = ($3), password = ($4) where user_id = ($5)',[req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.params.id])
      .then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  deleteUser(req, res, next) {
    pool.connect().then(client => {
      client.query('delete from users where user_id = ($1)',[req.params.id]).then(result => {
        client.release();
        return res.json(result.rows);
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  }

};

module.exports = requestController;
