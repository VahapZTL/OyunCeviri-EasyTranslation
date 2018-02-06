var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});

router.post('/', isLoggedIn, function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    const incomingImage = req.files.image;
    const _imageName = incomingImage.name;

    const imageName = _imageName.replace("jpg", "");
    incomingImage.mv(process.cwd() + '/public/dist/img/' + imageName + '.jpg',function (err) {
        if (err)
            return res.status(500).send(err);
    });

    User.findOne({_id : req.body.user_id}, function (err, user) {
        if(err)
            return res.status(400).send(err);

        if(req.body.password !== req.body._password) {
            return res.status(400).send('Şifreler uyuşmuyor.');
        }else{
            user.local.image = imageName + '.jpg';
            user.local.name = req.body.name;
            user.local.surname = req.body.surname;
            user.local.email = req.body.email;
            user.local.password = user.generateHash(req.body.password);
            console.log(user.local.image);
            user.save(function (err) {
               if(err)
                   return res.status(400).send(err);

                res.redirect('/profile');
            });
        }
    })
});

module.exports = router;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}