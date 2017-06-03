var db = require('../models');
var controllers = require('../controllers');

// GET /api/items
function index(req, res) {

  res.json({description: "surfboard"});

}

// POST /api/items
function create(req, res) {

  console.log("checking out req.body", req.body);
  console.log("checking out req.query", req.query);

  /*
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;
  */

  var newItem = new db.Item(req.query);
  newItem.save(function(err, item) {

    if(err) {
      console.log('error attempting to create a new item', err);
    }
    res.json(item)
  });


}



module.exports = {
  index: index,
  create: create
};
