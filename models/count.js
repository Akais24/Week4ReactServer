var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countSchema = new Schema({
    index : Number
});

module.exports = mongoose.model('count', countSchema);
