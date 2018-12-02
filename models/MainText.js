var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainTextSchema = new Schema({
    game: String,
    texts: [{
        type: Schema.ObjectId,
        ref: 'SubText'
    }],
    dictionary: {
        type: Schema.ObjectId,
        ref: 'Dictionary'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MainText', MainTextSchema);