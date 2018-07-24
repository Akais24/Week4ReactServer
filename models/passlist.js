var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passSchema = new Schema({
    id: String
});

module.exports = mongoose.model('passlist', passSchema);
