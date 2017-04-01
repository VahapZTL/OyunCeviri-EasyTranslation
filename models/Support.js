var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupportSchema = new Schema({
    subject: String,
    context: String,
    writer: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Support', SupportSchema);