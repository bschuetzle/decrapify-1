// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var items_list = [
  {
    description: "Wine Cork Cage",
    project: "Kitchen Klutter",
    photoURL: "https://dl.dropboxusercontent.com/s/q2dg2ziufdg8b26/wine_cork_cage.jpg?dl=0",
    category: "Miscellaneous",
    action: "Sell"
  },
  {
    description: "Cheese Koozie",
    project: "Kitchen Klutter",
    photoURL: "https://dl.dropboxusercontent.com/s/7bjb0zibl46hg09/cheese_koozie.jpg?dl=0",
    category: "Miscellaneous",
    action: "Keep"
  },
  {
    description: "Buddha Novelty Drink",
    project: "Kitchen Klutter",
    photoURL: "https://dl.dropboxusercontent.com/s/r1y2a0o9ypk9go5/buddha_drink.jpg?dl=0",
    category: "Miscellaneous",
    action: "Donate"
  },
  {
    description: "Star Light",
    project: "Kitchen Klutter",
    photoURL: "https://dl.dropboxusercontent.com/s/xa2u9wn0irwhpmf/star_light.jpg?dl=0",
    category: "Miscellaneous",
    action: "Throw Away"
  },
  {
    description: "Tevas",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/hnexan9fvs87rpx/tevas.jpg?dl=0",
    category: "Shoes",
    action: "Donate"
  }
];


var projects_list = [
  {
    name: "Kitchen Klutter",
    description: "Make my kitchen look more like something you would see on HGTV (the after versions)",
    photoURL: "https://dl.dropboxusercontent.com/s/o20pipqw54oukcq/project_kitchen_klutter.png?dl=0",
    startDate: "5/1/2017",
    numDaysToComplete: 30
  },
  {
    name: "Closet Chaos",
    description: "I want to get rid of a bunch of extra clutter in the closets and on the shelves",
    photoURL: "http://i.imgur.com/adfasfasdf.jpg",
    startDate: "5/4/2017",
    numDaysToComplete: 14
  },
  {
    name: "Garage Cleanout 2017",
    description: "Donate or sell some unused items in storage in the garage",
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
