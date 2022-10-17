var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
require('dotenv').config();
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(function(req:any, res:any, next:any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 3000;

app.set('port', port);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


var usermodel = require('./models/user');
var user = require('./routes/user');
var room = require('./routes/room');
var reservation = require('./routes/reservation');

app.use('/images', express.static('images'));
app.use('/user', user);
app.use('/room', room);

app.get('/', (req: any, res: any) => {
  res.send('Hello world!')
})
// headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }
app.use('/reservation', reservation);



module.exports = app;