var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DictionarySchema = new Schema({
    gameId: {
        type: Schema.ObjectId,
        ref: 'MainText'
    },
    texts: [{
        originalText: String,
        meaningText: String
    }]
});

module.exports = mongoose.model('Dictionary', DictionarySchema);