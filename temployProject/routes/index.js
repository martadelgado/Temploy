var express = require('express');
// const ensureLogin = require("connect-ensure-login");
var router = express.Router();
var auth = require('../helpers/auth');
const Job = require('../models/job');
const Application = require('../models/application');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});
router.get('/thor',  (req, res, next)=>{
  res.render('thor', { user: res.locals.currentUser});
});






router.post('/dashboard', auth.checkLoggedIn('You must be logged in', '/login'), (req, res, next) => {
  Job.findById(req.body.id, (err, job)=>{
    if (job.user.toString() === res.locals.currentUser._id ){
      // $("#myBtn").click(function(){
      //     $("#myModal").modal();
      // });

      res.send("you cant apply!");

    }else {
      let newApp = new Application({
        user: res.locals.currentUser,
        job: req.body.id
      });
      newApp.save((err, user)=>{
        if (err) {
          next(err);
        } else {
          res.redirect('dashboard');
        }
      });
    }
  });
});
router.get('/dashboard', auth.checkLoggedIn('You must be logged in', '/login'), function(req, res, next) {
  Job.find({user: req.user._id})
    .populate("user", "username")
    .populate("temployer", "username")
    .exec((err,jobs)=>{
      if (err) {
        next(err);
        return;
      } else {
        Application.find({user: req.user._id})
          .populate("user")
          .populate("job")
          .exec((err, applications)=>{
            if(err){
              next(err);
      } else {
        res.render('dashboard', {user: req.user, job: jobs, applications: applications });
      }
    });
}
});
});
router.get('/admin', auth.checkLoggedIn('You must be login', '/signup'), auth.checkCredentials('ADMIN'), function(req, res, next) {
  res.render('admin', { user: req.user });
});


module.exports = router;
