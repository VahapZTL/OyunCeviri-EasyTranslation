var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubTextSchema = new Schema({
    baseGame: String,
    texts: [{
        lineNum: String,
        text: String
    }],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SubText', SubTextSchema);