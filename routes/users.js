var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

/* Defines User Model */
var User = mongoose.model('User', { fname: String, lname: String });

/* Connects to test DB */
mongoose.connect("mongodb://localhost/test");

/* GET users listing saves parameters to user model in test DB. */
router.get('/:fname-:lname', function(req, res, next) {
    new User({ fname: req.params.fname, lname: req.params.lname }).save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Saved ' + req.params.fname + ' ' + req.params.lname);
        }
    });
    res.render('index', {title: (user.fname + ' ' + user.lname)});
});

/* GET users listing by looking up first lname used with entered fname. */
router.get('/:fname', function(req, res, next) {

    // iff lname is null
    User.findOne({ 'fname': req.params.fname, 'lname': null}, 'fname lname', function (err, person) {
        if (err) {
            return handleError(err);
        }
        else if (person == null) {
            res.render('index', {title: req.params.fname});
        }
    });

    // iff lname is not null
    User.findOne({ 'fname': req.params.fname }, 'fname lname', function (err, person) {
        if (err) return handleError(err);
        res.render('index', { title: person.fname + ' ' + person.lname });
    });

    var user = new User({ fname: req.params.fname, lname: null});
    user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Saved ' + user.fname);
        }
    });

    var handleError = function(err) {
        console.log('Error handler');
    };


});


module.exports = router;