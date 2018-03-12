var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubTextSchema = new Schema({
    subTextName: String,
    texts: [{
        lineNum: String,
        originalText: String,
        translatedText: String
    }],
    baseText: {
        type: Schema.ObjectId,
        ref: 'MainText'
    },
    isTranslated: Boolean,
    isControlled: Boolean,
    isFixed: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SubText', SubTextSchema);