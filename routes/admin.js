var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function(req, res, next) {
    User.findOne({ _id: req.body.user_id}, function(err, user){
        if(err)
            console.log(err);

        user.local.name = req.body.name;
        user.local.surname = req.body.surname;
        user.local.email = req.body.email;
        user.local.password = user.generateHash(req.body.password);

        user.save(function(err){
            if(err)
                console.log(err);

            console.log("Başarılı");
        });
    });
});

module.exports = router;