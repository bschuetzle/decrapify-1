var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ItemsSchema = new Schema (
  {
    description: String,
    photoURL: String,
    category: String,
    upVotes: Number,
    downVotes: Number,
    action: String
  }
)

var Item = mongoose.model('Item', ItemsSchema);

module.exports = Item;
