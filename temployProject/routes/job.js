var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');



router.get('/jobform', function(req, res, next) {
  res.render('job/jobform');
});


router.post('/jobform', (req, res, next) => {
  // console.log("posrting a job: ", res.locals.currentUser)
  const addJob = {
    jobTitle: req.body.jobTitle,
    jobCategory: req.body.jobCategory,
    jobDescription: req.body.jobDescription,
    jobDeadline: req.body.jobDeadline,
    user: res.locals.currentUser
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




router.get('/job/jobpostings', function(req, res, next) {
  // Job.find({}, (err, jobList) =>{
  //   res.render('job/jobpostings', {
  //     jobs: jobList
  //   });
  // });
  Job.find({})
    .populate("user", "username")
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
    if(err) { return next (err);
    } else {
    res.render('job/job-profile', {
      jobs: oneJob
    });
  }
});
});


module.exports = router;
