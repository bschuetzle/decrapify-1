// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var items_list = [
  {
    description: "Basketball",
    project: "Organize Garage",
    photoURL: "http://i.imgur.com/basketball.jpg",
    category: "Sporting Goods",
    upVotes: 2,
    downVotes: 10,
    action: "Sell"
  },
  {
    description: "Surfboard",
    project: "Organize Garage",
    photoURL: "http://i.imgur.com/surfboard.jpg",
    category: "Sporting Goods",
    upVotes: 6,
    downVotes: 4,
    action: "Keep"
  },
  {
    description: "VCR",
    project: "Organize Garage",
    photoURL: "http://i.imgur.com/vcr.jpg",
    category: "Electronics",
    upVotes: 0,
    downVotes: 6,
    action: "Donate"
  },
  {
    description: "Cheese Koozie",
    project: "Spring Cleaning 2017",
    photoURL: "http://i.imgur.com/cheese-koozie.jpg",
    category: "Miscellaneous",
    upVotes: 2,
    downVotes: 10,
    action: "Throw Away"
  },
  {
    description: "Employee of the Month DVD",
    project: "Spring Cleaning 2017",
    photoURL: "http://i.imgur.com/employee-dvd.jpg",
    category: "Media",
    upVotes: 1,
    downVotes: 4,
    action: "Donate"
  }
];


var projects_list = [
  {
    name: "Organize Garage",
    description: "Get rid of some unused stuff in the garage so I can make room for a sweet new mountain bike.",
    photoURL: "http://i.imgur.com/adfasfasdf.jpg",
    startDate: "7/20/2016",
    numDaysToComplete: 20
  },
  {
    name: "Spring Cleaning 2017",
    description: "I want to get rid of a bunch of extra clutter in the closets and on the shelves.",
    photoURL: "http://i.imgur.com/adfasfasdf.jpg",
    startDate: "3/4/2017",
    numDaysToComplete: 14
  }
];


db.Project.remove({}, function(err, projects) {
  console.log('removed all projects');
  db.Project.create(projects_list, function(err, projects) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all projects');
    console.log("created", projects.length, "projects");


    db.Item.remove({}, function(err, items) {
      console.log('removed all items');
      items_list.forEach(function (itemData) {
        var item = new db.Item ({
          description: itemData.description,
          photoURL: itemData.photoURL,
          category: itemData.category,
          upVotes: itemData.upVotes,
          downVotes: itemData.downVotes,
          action: itemData.action
        });
        db.Project.findOne({name: itemData.project}, function (err, foundProject) {
          console.log('found project ' + foundProject.name + ' for item ' + item.description);
          if (err) {
            console.log(err);
            return;
          }
          item.project = foundProject;
          item.save(function(err, savedItem) {
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedItem.description + ' for project ' + foundProject.name);
          });
        });
      });
    });

  });
});
