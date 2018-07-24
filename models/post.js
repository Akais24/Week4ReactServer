var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    id : Number,
    category : String,
    title : String,
    content : String,
    date : String,
    author : String,
    picture_name : String,
    picture : String,
    header : String,
});

module.exports = mongoose.model('post', postSchema);
