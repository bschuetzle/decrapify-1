
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

app.get('/projects/:id/items', function homepage(req, res) {
   res.sendFile(__dirname + '/public/projects.html');
});

// ITEMS
// -----

// "GET" api for all items
app.get('/api/items', controllers.items.index);

// "POST" api for items
app.post('/api/items', controllers.items.create);

// "PUT" api for items
app.put('/api/items/:id', controllers.items.update);

// "DELETE" api for items
app.delete('/api/items/:id', controllers.items.destroy);

// GET api for all items for a specific project
app.get('/api/projects/:id/items', controllers.items.projectitemsindex);


// PROJECTS
// --------

// "GET" api for all projects
app.get('/api/projects', controllers.projects.index);

// "GET" api for single project by id
app.get('/api/projects/:id', controllers.projects.show);

// "POST" api for projects
app.post('/api/projects', controllers.projects.create);




/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
