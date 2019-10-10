var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var file = new Schema({
    "name": { type: String, unique: true },
    "fileType": String,
    "fileSize": String,
    "dateUploaded": String,
    "dateModified": String    
  });
  
module.exports = file;