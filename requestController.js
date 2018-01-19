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
    let projectId = req.params.id;

    pool.connect().then(client => {
      client.query('select * from projects where project_id=($1)',[projectId]).then(result => {
        // client.release(); 
        // return res.json(result.rows);
        if (!result.rows[0]) {
          console.log('Task must be created in an existing project');
          client.release();
          res.status(418).send('Task must be created in an existing project');
        } else {
          client.release();
          return res.json(result.rows);
        }
      }).then( result => {
        next();
      })
      .catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
      });
    });
  },

  addProject(req, res, next) {
    let projectName = req.body.projectName;

    pool.connect().then(client => {
      client.query('insert into projects (project_name) values ($1)',[projectName]).then(result => {
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
    let projectId = req.params.id;
    let newName = req.body.projectName;

    pool.connect().then(client => {
      client.query('update projects set project_name = ($1) where project_id = ($2)',[newName, projectId]).then(result => {
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
    let projectId = req.params.id;

    pool.connect().then(client => {
      client.query('delete from projects where project_id = ($1)',[projectId]).then(result => {
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
    let taskId = req.params.id;

    pool.connect().then(client => {
      client.query('select * from tasks where task_id=($1)',[taskId]).then(result => {
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
    console.log('made it to add task');
    let projectId = req.params.id;

    // before making connection, make sure all task attributes included
    if (!req.body.summary || !req.body.description || !req.body.due_date || !req.body.priority) {
      res.status(418).send('Task must include summary, description, due date and priority.');
    } else {
      return res.json(result.rows);
    }
   
    // console.log(keys);

    // pool.connect().then(client => {
    //   client.query('select * from projects where project_id = ($1)',[projectId])
    //   .then(result => {
    //     if (!result.rows[0]) {
    //       console.log("project doesn't exist");
    //       res.status(418).send('Task must be created in an existing project');
    //     } else {
    //       client.release();
    //       return res.json(result.rows);
    //     }
    //     // if(!result.rows[0]) res.status(418).send('Task must be created in an existing project');
    //     // if (res.json(result.rows) === []){
    //     //   console.log("empty!");
    //     // }
        
    //   })
    //   .catch(e => {
    //     client.release();
    //     console.error('query error', e.message, e.stack);
    //   });
    // });
  },
};

module.exports = requestController;
