var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: String,
    password : String,
    name : String,
    number : String,
    address : String,
});

module.exports = mongoose.model('user', userSchema);
