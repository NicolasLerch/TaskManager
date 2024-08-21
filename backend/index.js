const express = require('express');
const path = require('path')
const indexRouter = require('./src/routes/index.routes')
const mysql = require('mysql');

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'task_manager_db'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/tryDB', (req, res) => {
  db.query("SELECT t.name as task, p.name as project FROM	tasks t JOIN projects p ON t.project_id = p.id;", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving users');
    } else {
      res.send(results);
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});
app.use('/api', indexRouter)


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})