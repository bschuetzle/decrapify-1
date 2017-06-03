var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/decrapify");

module.exports = {
  Item: require('./items.js')
}
