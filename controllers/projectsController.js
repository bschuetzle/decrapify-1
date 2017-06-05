var db = require('../models');
var controllers = require('../controllers');



// GET /api/projects
function index(req, res) {

  db.Project.find({}, function(err, projects) {
    res.json(projects);
  })

}


// GET /api/project/:id
function show(req, res) {

  projectID = req.params.id;
  db.Project.find( { _id: projectID}, function(err, project) {
    if(err) {
      console.log('error attempting to find a project', err);
    }
    res.json(project);
  })

}


// POST /api/projects
function create(req, res) {

  var newProject = new db.Project(req.body);
  newProject.save(function(err, project) {

    if(err) {
      console.log('error attempting to create a new project', err);
    }
    res.json(project);
  });

}


module.exports = {
  index: index,
  create: create,
  show: show
};
