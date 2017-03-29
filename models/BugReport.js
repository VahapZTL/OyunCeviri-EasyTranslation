var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BugReportSchema = new Schema({
    userID: String,
    subject: String,
    context: String
});

module.exports = mongoose.model('BugReport', BugReportSchema);