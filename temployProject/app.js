const express         = require('express');
const path            = require('path');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const expressLayouts  = require('express-ejs-layouts');
const mongoose        = require('mongoose');
const session         = require('express-session');
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const flash           = require('connect-flash');
const MongoStore      = require('connect-mongo')(session);
const User            = require("./models/user");
const bcrypt          = require("bcrypt");
const index          = require('./routes/index');
const authController = require('./routes/authController');
const job            = require('./routes/job');
const users          = require('./routes/users');
const auth           = require('./helpers/auth');





mongoose.connect('mongodb://localhost:27017/temploy');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use(session({
//   secret: '',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 },
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60 // 1 day
//   })
// }));

app.use(session({
  secret           : "passport-local-strategy",
  resave           : true,
  saveUninitialized: true,
  cookie           : { maxAge: 60000 }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    User.findOne({ "_id": user._id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
});

passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));


app.use(auth.setCurrentUser);


app.use('/', authController);
app.use('/', index);
app.use('/', job);

app.use('/', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
