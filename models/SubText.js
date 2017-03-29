var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubTextSchema = new Schema({
    baseGame: String,
    texts: [{
        lineNum: String,
        text: String
    }]
});

module.exports = mongoose.model('SubText', SubTextSchema);