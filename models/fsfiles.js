var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gridSchema = new Schema({},{ strict: false });
module.exports = mongoose.model("newGrid", gridSchema, "fs.files");