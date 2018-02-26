var express = require('express');
var router = express.Router();

router.get('/', isLoggedIn, requireRole, function(req, res, next) {
  res.render('userGroup', {user: req.user});
});

router.post('/', isLoggedIn, requireRole, function(req, res, next){
  
});

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
