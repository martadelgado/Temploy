var express = require('express');
var router = express.Router();
var multer        = require('multer');
const User = require('../models/user');
const Job = require('../models/job');
const Picture = require('../models/pictures');
var auth = require('../helpers/auth');
const upload      = multer({ dest: './public/uploads/' });





/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//
// router.get('/dashboard/:id', (req, res, next) => {
//   let userId = req.params.id;
//
//   User.findById(userId, (err, oneUser) =>{
//     if(err) {
//       next (err);
//     } else {
//       res.render('dashboard', {
//         users: oneUser
//       });
//     }
//   });
// });
router.post('/dashboard/:id/edit', upload.single('file'), (req, res, next) => {
    let userId = req.params.id;
    pic = new Picture({
      namePic: req.body.name,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.file.originalname,
      user: req.params.id
    });
      pic.save((err) => {
        res.redirect('edit');
      });
});
router.post('/dashboard/:id/editprofile', (req, res, next) => {
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
        res.redirect('edit');
      }
    });
});
router.get('/dashboard/:id/edit', auth.checkLoggedIn('You must be logged in', '/login'), (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId, (err, user)=>{
    if (err) {
      next(err);
    }
    else {
  Picture.find({user: req.user._id}, (err, pictures) => {
        if(err){
          next(err);
          return;
    } else {
      console.log("user is ", user);
      res.render('editProfile', {user, pictures});
    }
  });
  }
});
});
router.get('/picture/:id/delete', (req, res, next) => {
  const picId = req.params.id;
  Picture.findByIdAndRemove(picId, (err, deletePic) => {
    if (err){
      next(err);
    }
     res.redirect('/dashboard');
  });
});
module.exports = router;
