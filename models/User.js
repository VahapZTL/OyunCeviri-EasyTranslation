var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
        isAdmin: Boolean,
        isProjectManager: Boolean,
        isTranslator: Boolean
    },

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.method.findById = function(id, cb) {
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