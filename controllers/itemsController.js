var db = require('../models');
var controllers = require('../controllers');

// GET /api/items
function index(req, res) {

  db.Item.find({}, function(err, items) {
    //console.log(items);
    res.json(items);
  })

}

// POST /api/items
function create(req, res) {

  console.log("checking out req.body", req.body);
  console.log("checking out req.query", req.query);

  // note: use req.query when testing with Postman, otherwise req.body will have the object passed from data:
  var newItem = new db.Item(req.query);
  newItem.save(function(err, item) {

    if(err) {
      console.log('error attempting to create a new item', err);
    }
    res.json(item)
  });

}

// PUT or PATCH /api/items/:itemId
function update(req, res) {

  // note: don't forget to change req.query to req.body (req.query just for testing w/ Postman)
  itemID = req.params.id;
  console.log("update itemID: ", itemID);
  console.log(req.query);
  var updatedItem = req.query;
  db.Item.findOneAndUpdate({ _id: itemID }, updatedItem, {}, function(err, updatedItem) {
    res.json(updatedItem);
  });

}

// DELETE /api/items/:itemId
function destroy(req, res) {

  itemID = req.params.id;
  console.log("delete itemID: ", itemID);
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
