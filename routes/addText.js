var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var MainText = mongoose.model('MainText');

router.get('/', isLoggedIn, function(req, res, next) {
    res.render('addText', {user: req.user});
});

router.post('/', isLoggedIn, function (req, res, next) {
    if(!req.files) {
        res.header("Content-Type", "text/plain; charset=utf-8");
        return res.status(400).send('Dosya Yüklenirken Hata Oluştu!');
    }else{
        var mainText = req.files.mainText;

        mainText.mv('./public/uploads/incomingText.txt', function(err) {
            if (err)
                return res.status(500).send(err);

            res.send('Dosya Yüklendi');
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
