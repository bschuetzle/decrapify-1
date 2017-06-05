var db = require('../models');
var controllers = require('../controllers');

// GET /api/items
function index(req, res) {

  db.Item.find()
    .populate('project')
    .exec(function(err, items) {
      if (err) {
        console.log("index error: " + err);
      }
      res.json(items);
    });

}

// POST /api/items
function create(req, res) {

  var newItem = new db.Item ({
    description: req.body.description,
    photoURL: req.body.photoURL,
    category: req.body.category,
    upVotes: req.body.upVotes,
    downVotes: req.body.downVotes,
    action: req.body.action
  });

  // find the project id and add it to the item before saving
  db.Project.findOne({name: req.body.project}, function(err, project) {
    newItem.project = project;
    newItem.save(function(err, item) {
      if (err) {
        return console.log("create error: " + err);
      }
      console.log("created ", item.description);
      res.json(item);
    });
  });


}

// PUT or PATCH /api/items/:itemId
function update(req, res) {

  itemID = req.params.id;
  var updatedItem = req.body;
  db.Item.findOneAndUpdate({ _id: itemID }, updatedItem, {}, function(err, updatedItem) {
    res.json(updatedItem);
  });

}

// DELETE /api/items/:itemId
function destroy(req, res) {

  itemID = req.params.id;
  db.Item.findOneAndRemove({ _id: itemID }, function(err, deletedItem) {
    res.json(deletedItem);
  });

}


module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy
};
