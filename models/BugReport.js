var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BugReportSchema = new Schema({
    subject: String,
    context: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BugReport', BugReportSchema);