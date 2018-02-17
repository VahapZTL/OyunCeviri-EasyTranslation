var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var MainText = mongoose.model('MainText');
var unzip = require('unzip-stream');
var excel = require('xlsx');

router.get('/', isLoggedIn, function(req, res, next) {
    res.render('addText', {user: req.user});
});

router.post('/', isLoggedIn, function (req, res, next) {
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

        new Promise(function(resolve) {

            fs.createReadStream(process.cwd() + '/public/uploads/' + fileName + '.zip')
                .pipe(unzip.Extract({ path: process.cwd() + '/public/uploads/' }));
            resolve(process.cwd() + '/public/uploads/' + fileName + '.xlsx');

        }).then(function(result) {

            var workbook = excel.readFile(result);
            var sheet_name_list = workbook.SheetNames;
            var excelData = excel.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            console.log(excelData);

            res.send('File uploaded!');
            return excelData;
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
