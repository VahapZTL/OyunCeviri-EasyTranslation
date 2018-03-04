var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserGroup = mongoose.model('UserGroup');

router.get('/', isLoggedIn, requireRole, function(req, res, next) {

    var userGroupObj = null;
    var projectManObj = null;

    UserGroup.find({}, function(err, group) {
        if (err) throw err;
        if (group.length <= 0) console.log('Veri Bulunamadı');
            userGroupObj = group.map(function(groupData) {
                var obj = {
                    _id: groupData._id,
                    name: groupData.groupName
                };
                return obj;
            });

        User.find({ 'local.userRole' : 'ProjectManager'}, function (err, user) {
            if(err) console.log(err);
            if(user.length <= 0) console.log('Proje Yöneticisi Bulunamadı!');
    
            projectManObj = user.map(function (userData) {
                var obj2 = {
                    _id: userData._id,
                    name: userData.local.name,
                    surname: userData.local.surname
                }
                return obj2;
            });
            res.render('userGroup', {user: req.user, projectManRes: projectManObj, userGroupRes: userGroupObj});
        });
    });
});

router.post('/', isLoggedIn, requireRole, function (req, res, next) {
    console.log(req.body);
    UserGroup.findOne({ _id: req.body.groupID }, function (err, userGroupData) {
        if (err) console.log(err);
        if (userGroupData.length <= 0 ) console.log('User Grup Modeli Bulunamadı!');

        var _rolledUser = req.body.rolledUser;
        console.log(_rolledUser.indexOf(','));
        if (req.body.userRole === 'Translator') {
            if (_rolledUser.indexOf(',') > -1){
                var comingRolledUser = _rolledUser.split(',');

                comingRolledUser.forEach(element => {
                    userGroupData.translators.push(element);
                });

                userGroupData.save(function (err) {
                    if (err) console.log(err);
                    console.log('User Goup Kaydedildi.1');
                    res.status(200);
                });
            }else {
                userGroupData.translators.push(_rolledUser);

                userGroupData.save(function (err) {
                    if (err) console.log(err);
                    console.log('User Goup Kaydedildi.2');
                    res.status(200);
                });
            }
        }else if (req.body.userRole === 'ProofReader') {
            userGroupData.proofreader = _rolledUser;

            userGroupData.save(function (err) {
                if (err) console.log(err);
                console.log('User Goup Kaydedildi.3');
                res.status(200);
            });
        }else if (req.body.userRole === 'Controller') {
            userGroupData.controller = _rolledUser;

            userGroupData.save(function (err) {
                if (err) console.log(err);
                console.log('User Goup Kaydedildi.4');
                res.status(200);
            });
        }else {
            console.log('Tanımlanamayan Mevki');
        }
    });
});

router.post('/addGroup', isLoggedIn, requireRole, function (req, res, next) {
    //Add Group Post
    UserGroup.findOne({groupName: req.body.groupName}, function (err, userGroup) {
        if(err) console.log(err);
        if(userGroup) console.log('Zaten böyle bir grup mevcut');

        var newGroup = new UserGroup();

        newGroup.groupName = req.body.groupName;
        newGroup.projectManager = req.body.projectManager;

        newGroup.save(function (err) {
            if(err) console.log(err);
            console.log("Başarıyla kaydedildi!");
        });

        res.json({
            _id: newGroup._id,
            name: newGroup.groupName
        });
    });
});

router.post('/selectRole', isLoggedIn, requireRole, function (req, res, next) {

    var selectedRoleRes = null;
    console.log(req.body);
    User.find({ 'local.userRole': req.body.userRole}, function (err, selectedRole) {
        if (err) console.log(err);
        if (!selectedRole) console.log('Seçilen mevkide kullanıcı yok!');

        selectedRoleRes = selectedRole.map(function (selectedRoleData) {
            var obj3 = {
                _id     : selectedRoleData._id,
                name    : selectedRoleData.local.name,
                surname : selectedRoleData.local.surname
            }
            return obj3;
        });

        res.json(selectedRoleRes);
    });
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
