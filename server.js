
var express = require('express'), app = express();
var controllers = require('./controllers');
var bodyParser = require('body-parser');
var moment = require('moment');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



/**********
 * ROUTES *
 **********/

app.get('/', function homepage(req, res) {
   res.sendFile(__dirname + '/views/index.html');
});

// "GET" api for items
app.get('/api/items', controllers.items.index);

// "POST" api for items
app.post('/api/items', controllers.items.create)



/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
