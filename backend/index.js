const express = require('express');
const path = require('path')
const indexRouter = require('./src/routes/index.routes')
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});
app.use('/', indexRouter)


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})