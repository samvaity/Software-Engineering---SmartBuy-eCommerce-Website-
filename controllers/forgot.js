var User = require('../models/user');
async = require("async");
var path = require('path'), fs = require('fs');
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var commonserver = require('./commonserver');

module.exports = function(app) {

app.get('/forgot', function(req, res) {
  res.render('forgot.html', {
       user: req.user

  });
});

/*this method will send an email to the user entered address and if the address
 is found it will send user an email with reset password link. */
app.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
       //console.log(req.body.email);
      User.findOne({"user.email": req.body.email }, function(err, user) {
        if (!user) {
         // console.log("in error");
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
        //console.log(user);
        user.user.resetPasswordToken = token;
        user.user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
          user: 'samsetest@gmail.com',
          pass: 'Sam12345'
        }
      });
     // console.log(user.email);
      var mailOptions = {
        to: req.body.email,
        from: 'passwordreset@demo.com',
        subject: 'SmartBuy Password Reset',
        text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) { return next(err);}
    else
      {res.redirect('/');}
  });
});

}