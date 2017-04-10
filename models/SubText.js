var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubTextSchema = new Schema({
    texts: [{
        lineNum: String,
        text: String
    }],
    baseText: {
        type: Schema.ObjectId,
        ref: 'MainText'
    },
    isTranslated: Boolean,
    isControlled: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SubText', SubTextSchema);