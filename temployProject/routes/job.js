var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');
var auth = require('../helpers/auth');



router.get('/job/jobpostings', function(req, res, next) {

  Job.find({})
    .populate("user")
    .exec((err, jobs)=>{
      if(err){
        next(err);
      } else {
        res.render('job/jobpostings', {
          jobs: jobs
        });
      }
    });
});

router.get('/jobpostings/:id', (req, res, next) => {
  let jobId = req.params.id;

  Job.findById(jobId, (err, oneJob) =>{
    if(err) {
      next (err);
    } else {
      res.render('job/job-profile', {
        jobs: oneJob
      });
    }
  });
});

router.get('/jobpostings/:id/edit', (req, res, next) => {

  let jobId = req.params.id;

  Job.findById(jobId, (err, job)=>{
    if (err) {
      next(err);
    } else {
      res.render('edit', {job});
    }
  });
});



router.post('/jobpostings/:id/edit', (req, res, next) => {
  let jobId = req.params.id;

  const jobToUpdate = {
    jobTitle: req.body.jobTitle,
    jobCategory: req.body.jobCategory,
    jobDescription: req.body.jobDescription,
    jobDeadline: req.body.jobDeadline,
  };
  Job.findByIdAndUpdate(jobId, jobToUpdate, (err, job)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/dashboard');
    }
  });
});





router.get('/jobpostings/:id/delete', (req, res, next) => {

  let jobId = req.params.id;

  Job.findByIdAndRemove(jobId, (err, job)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/dashboard');
    }
  });

});

router.get('/jobform', auth.checkLoggedIn('You must be logged in', '/login'), function(req, res, next) {
  res.render('job/jobform');
});


router.post('/jobform', auth.checkLoggedIn('You must be logged in', '/login'), (req, res, next) => {
  // console.log("posrting a job: ", res.locals.currentUser)
  const addJob = {
    jobTitle: req.body.jobTitle,
    jobCategory: req.body.jobCategory,
    jobDescription: req.body.jobDescription,
    jobDeadline: req.body.jobDeadline,
    user: res.locals.currentUser._id
  };
  const newJob = new Job(addJob);

  newJob.save( (err) => {
    if (err) {
      res.render('job/jobform');
      // next(err)
    }
    return res.redirect('job/jobpostings');
  });
  // return res.redirect('job/jobpostings');
});











module.exports = router;
