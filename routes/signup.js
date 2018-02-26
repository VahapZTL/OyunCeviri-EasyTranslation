var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', isLoggedIn, requireRole, function(req, res, next) {
    res.render('signup', {user: req.user});
});

router.post('/', isLoggedIn, requireRole, passport.authenticate('local-signup', {
    successRedirect : '/signup', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

function requireRole (req, res, next) {
    if (req.user && req.user.local.userRole === 'Administrator' || req.user.local.userRole === 'ProjectManager') {
        next();
    } else {
        res.send(403);
    }
}