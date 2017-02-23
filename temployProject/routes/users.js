var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');
var auth = require('../helpers/auth');




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard/:id', (req, res, next) => {
  let userId = req.params.id;

  User.findById(userId, (err, oneUser) =>{
    if(err) {
      next (err);
    } else {
      res.render('/dashboard', {
        users: oneUser
      });
    }
  });
});




router.get('/dashboard/:id/edit', (req, res, next) => {

  let userId = req.params.id;

  User.findById(userId, (err, user)=>{
    if (err) {
      next(err);
    } else {
      res.render('editProfile', {user});
    }
  });
});



router.post('/dashboard/:id/edit', (req, res, next) => {
    let userId = req.params.id;

  const userToUpdate = {
    name: req.body.name,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
  };
  User.findByIdAndUpdate(userId, userToUpdate, (err, user)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/dashboard');
    }
  });
});


module.exports = router;
