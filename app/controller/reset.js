var User = require('../models/user');
async = require("async");
var nodemailer = require("nodemailer");

module.exports = function(app) {

    /* reset */
app.get('/reset/:token', function(req, res) {
 console.log("in reset");
   User.findOne({"user.resetPasswordToken": req.params.token, "user.resetPasswordExpires": { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
   console.log("Reached here!!!");
      console.log(user);
    res.render('reset.html', {
      user: user
    });
  });
});


app.post('/reset/:token', function(req, res) {
  console.log("In reset after");
  console.log(req.body);
  async.waterfall([
    function(done) {
      User.findOne({"user.username": req.body.username }, function(err, user) {
        
       // console.log("not coming hre");
        if (!user) {
          console.log("not finding teh user");
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        console.log(req.body);
          user.user.password = user.generateHash(req.body.password);
  /*      user.user.password = req.body.password;*/
        user.user.resetPasswordToken = null;
        user.user.resetPasswordExpires = null;
        console.log("After my thingy");
       console.log(user.user.email);   
   console.log(user.user.password);

   user.markModified("user");
         user.save(function(err) {
          done(err, user);
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
          user: 'samsetest@gmail.com',
          pass: 'Sam12345'
        }
      });
      console.log("In reset send mail");
      console.log(req.body.email);
      var mailOptions = {
        to: user.user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});

/*end of reset*/
}



