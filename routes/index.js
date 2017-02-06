var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/:user', function(req, res, next) {
    res.render('profile', { title: req.params.user });
});
module.exports = router;