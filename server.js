
var express = require('express'), app = express();
var controllers = require('./controllers');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));



/**********
 * ROUTES *
 **********/


app.get('/', function homepage(req, res) {
   res.sendFile(__dirname + '/views/index.html');
});



/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
