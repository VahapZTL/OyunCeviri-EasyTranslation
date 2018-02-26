var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserGroupSchema = new Schema({
    groupName: String,
    projectManager: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    controller: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    proofreader: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    translaters: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: Schema.ObjectId,
        ref: 'SubText'
    }]
});

module.exports = mongoose.model('UserGroup', UserGroupSchema);