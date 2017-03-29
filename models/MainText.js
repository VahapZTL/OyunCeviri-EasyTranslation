var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainTextSchema = new Schema({
    game: String,
    texts: [{
        lineNum: String,
        text: String
    }]
});

module.exports = mongoose.model('MainText', MainTextSchema);