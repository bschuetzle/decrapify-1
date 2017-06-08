// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var items_list = [
  {
    description: "Aerobed",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/9dyj3r31j91h8nl/aerobed.jpg?dl=0",
    category: "Bedding",
    action: "Donate"
  },
  {
    description: "Teva Sandals",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/hnexan9fvs87rpx/tevas.jpg?dl=0",
    category: "Shoes",
    action: "Donate"
  },
  {
    description: "Downton Abbey Box Set",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/x8rc81zxnhgutr8/downton_abbey_box_set.jpg?dl=0",
    category: "Media",
    action: "Give To Friend"
  },
  {
    description: "X-Mas Socks",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/btnhme1hkk869eb/xmas_socks.jpg?dl=0",
    category: "Clothing",
    action: "Throw Away"
  },
  {
    description: "Wine Cork Cage",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/q2dg2ziufdg8b26/wine_cork_cage.jpg?dl=0",
    category: "Miscellaneous",
    action: "Sell"
  },
  {
    description: "Cheese Koozie",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/7bjb0zibl46hg09/cheese_koozie.jpg?dl=0",
    category: "Miscellaneous",
    action: "Keep"
  },
  {
    description: "Ceramic Tiki Mug",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/r1y2a0o9ypk9go5/buddha_drink.jpg?dl=0",
    category: "Miscellaneous",
    action: "Donate"
  },
  {
    description: "Star Light",
    project: "Closet Chaos",
    photoURL: "https://dl.dropboxusercontent.com/s/xa2u9wn0irwhpmf/star_light.jpg?dl=0",
    category: "Miscellaneous",
    action: "Throw Away"
  },
  {
    description: "Basketball",
    project: "Organize Garage",
    photoURL: "https://dl.dropboxusercontent.com/s/6dojf6cagktflrm/basketball.jpg?dl=0",
    category: "Sporting Goods",
    action: "Donate"
  },
  {
    description: "Surfboard",
    project: "Organize Garage",
    photoURL: "https://dl.dropboxusercontent.com/s/x7pz7b33cdyoga8/surfboard.jpg?dl=0",
    category: "Sporting Goods",
    action: "Sell"
  },
  {
    description: "Rollerblades",
    project: "Organize Garage",
    photoURL: "https://dl.dropboxusercontent.com/s/ixcvjvddqrttvcc/rollerblades.jpg?dl=0",
    category: "Sporting Goods",
    action: "Keep"
  },
  {
    description: "Disk Golf Set",
    project: "Organize Garage",
    photoURL: "https://dl.dropboxusercontent.com/s/gynuxo4sjw7kmea/disk_golf_set.jpg?dl=0",
    category: "Sporting Goods",
    action: "Keep"
  }
];


var projects_list = [
  {
    name: "Closet Chaos",
    description: "I want to get rid of a bunch of extra clutter in the closets and on the shelves",
    photoURL: "https://dl.dropboxusercontent.com/s/6dxvdplhesi3w09/project_closet_clutter.jpg?dl=0",
    startDate: "6/4/2017",
    numDaysToComplete: 30
  },
  {
    name: "Organize Garage",
    description: "Donate or sell some unused items in storage in the garage",
    photoURL: "https://dl.dropboxusercontent.com/s/mhihge91hf892hp/project_garage_cleanup.jpg?dl=0",
    startDate: "5/1/2016",
    numDaysToComplete: 20
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
