var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ProjectsSchema = new Schema (
  {
    name: String,
    description: String,
    photoURL: String,
    startDate: Date,
    numDaysToComplete: Number
  }
)

var Project = mongoose.model('Project', ProjectsSchema);

module.exports = Project;
