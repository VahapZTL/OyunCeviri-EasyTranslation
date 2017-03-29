var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    local: {
        name: String,
        surname:String,
        email: String,
        password: String,
        isAdmin: Boolean,
        isProjectManager: Boolean,
        isController: Boolean,
        isProofReader: Boolean,
        isTranslator: Boolean,
        supportId: String,
        bugReportId: String,
        createdDate: {
            type: Date,
            default: Date.now
        }
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.setRank = function (rank) {
    var user = this;
    if(rank === isProjectManager)
        user.local.isProjectManager = true;
    else if(rank === isController)
        user.local.isController = true;
    else if(rank === isProofReader)
        user.local.isProofReader = true;
    else if(rank === isTranslator)
        user.local.isTranslator = true;
};

userSchema.methods.findById = function(id, cb) {
    process.nextTick(function() {
        var idx = id - 1;
        if (userSchema[idx]) {
            cb(null, userSchema[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);