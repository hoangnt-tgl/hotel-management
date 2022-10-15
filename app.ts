var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
require('dotenv').config();
var app = express();
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;
app.set('port', port);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


var usermodel = require('./models/user');
var user = require('./routes/user');
var room = require('./routes/room');

app.use('/images', express.static('images'));
// app.use('/user', user);
app.use('/room', room);

// headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }


app.get('/', (req:any, res:any) => {
  res.send('Hello world!')
})

module.exports = app;