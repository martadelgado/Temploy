var express = require('express');
// const ensureLogin = require("connect-ensure-login");
var router = express.Router();
var auth = require('../helpers/auth');
const Job = require('../models/job');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

router.get('/thor',  (req, res, next)=>{
  res.render('thor', { user: res.locals.currentUser});
});

router.get('/secret', auth.checkLoggedIn('You must be logged in', '/login'), function(req, res, next) {

  Job.find({user: req.user._id})
    .populate("user", "username")
    .populate("temployer", "username")
    .exec((err,jobs)=>{
      if (err) {
        next(err);
        return;
      }

      res.render('secret', {user: req.user, job: jobs });
    });
});


// Job.find({user: req.user._id})
//   .populate("user", "username")
//   .populate("temployer", "username")
//   // .sort("jobDeadline")
//   .exec((err,jobs)=>{
//     if (err) {
//       next(err);
//       return;
//     }
//     Job.find()
//       .populate()
//       .exec((err, other)=>{
//           res.render('secret', { user: req.user, job: jobs, other: other });
//       });
//   });
// });


router.get('/admin', auth.checkLoggedIn('You must be login', '/signup'), auth.checkCredentials('ADMIN'), function(req, res, next) {
  res.render('admin', { user: req.user });
});




module.exports = router;
