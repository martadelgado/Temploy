var express = require('express');
var router = express.Router();
router.post('/jobform', (req, res, next) => {
  const addJob = {
    jobTitle: req.body.jobTitle,
    jobCategory: req.body.jobCategory,
    jobDescription: req.body.jobDescription
  };
  const newJob = new Job(addJob);
  newJob.save( (err) => {
  if (err) {
  res.render('jobs/jobform', {
    job : job
  });
 }
  return res.redirect('jobs/jobpostings');
});
});
module.exports = router;
