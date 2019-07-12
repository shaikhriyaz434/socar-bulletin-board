const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database');
const noteRouter = require('./component/note/note.router');
const fileRoute = require('./component/ftp/files.route')
const app = express();

// Connect to the database
db.authenticate()
  .then(() => {
    console.log("connected to DB");
    db.sync(()=>{
      console.log("sync successful")
    }).catch((err)=>{
      console.log("sync failed")
    });

    
  })
  .catch(err => console.log(`error while connecting to DB ${err}`));

// view engine setup

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
      res.send(200);
  }
  else {
      next();
  }
};
app.use(allowCrossDomain);
app.use('/ftp', fileRoute);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/notes', noteRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
