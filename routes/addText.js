var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var MainText = mongoose.model('MainText');

router.get('/', isLoggedIn, function(req, res, next) {
    res.render('addText', {user: req.user});
});

router.post('/', isLoggedIn, function (req, res, next) {
    if(!req.files){

    }else{
        console.log(req.files.mainText.data.toString());
        var data1 = req.files.mainText.data.toString();
        res.json({
            success: true,
            data: data1
        });
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
