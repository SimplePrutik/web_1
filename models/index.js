var mongoose = require("mongoose");
mongoose.connect("mongodb://qqq:qqq@ds139761.mlab.com:39761/axit");

mongoose.set("debug", true);

module.exports.User = require("./user");

const noteRoutes = require('./note_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
};
