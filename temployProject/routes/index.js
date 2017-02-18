var express = require('express');
// const ensureLogin = require("connect-ensure-login");
var router = express.Router();
var auth = require('../helpers/auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

router.get('/secret', auth.checkLoggedIn('You must be logged in', '/login'), function(req, res, next) {
  res.render('secret', { user: req.user });
});

router.get('/admin', auth.checkLoggedIn('You must be login', '/signup'), auth.checkCredentials('ADMIN'), function(req, res, next) {
  res.render('admin', { user: req.user });
});




module.exports = router;
