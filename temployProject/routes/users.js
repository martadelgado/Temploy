var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;
