var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var MainText = mongoose.model('MainText');
var DecompressZip = require('decompress-zip');
var excel = require('xlsx');

router.get('/', isLoggedIn, requireRole, function(req, res, next) {
    res.render('addText', {user: req.user});
});

router.post('/', isLoggedIn, requireRole, function (req, res, next) {
    console.log(req.body.gameName);
    console.log(req.files.mainText.name);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const incomeFile = req.files.mainText;
    const __fileName = req.files.mainText.name;

    const fileName = __fileName.replace("zip","");

    // Use the mv() method to place the file somewhere on your server
    incomeFile.mv(process.cwd() + '/public/uploads/' + fileName + '.zip', function(err) {
        if (err)
            return res.status(500).send(err);

        var unzipper = new DecompressZip(process.cwd() + '/public/uploads/' + fileName + '.zip');

        unzipper.on('error', function (err) {
            console.log('Caught an error');
        });
        
        unzipper.on('extract', function (log) {
            var workbook = excel.readFile(process.cwd() + '/public/uploads/' + fileName + '.xlsx');
            var sheet_name_list = workbook.SheetNames;
            var excelData = excel.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            console.log(excelData);
            res.status(200).send('File uploaded!');
        });
        
        unzipper.on('progress', function (fileIndex, fileCount) {
            console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
        });
        
        unzipper.extract({
            path: process.cwd() + '/public/uploads/',
            filter: function (file) {
                return file.type !== "SymbolicLink";
            }
        });
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
