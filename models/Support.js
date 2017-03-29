var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupportSchema = new Schema({
    userID: String,
    subject: String,
    context: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Support', SupportSchema);