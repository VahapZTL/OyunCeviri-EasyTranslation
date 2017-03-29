var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainTextSchema = new Schema({
    game: String,
    texts: [{
        lineNum: String,
        text: String
    }],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MainText', MainTextSchema);