var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ItemsSchema = new Schema (
  {
    description: String,
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    photoURL: String,
    category: String,
    upVotes: {
       type: Number,
       default: 0
     },
    downVotes: {
       type: Number,
       default: 0
     },
    action: String
  }
)

var Item = mongoose.model('Item', ItemsSchema);

module.exports = Item;
