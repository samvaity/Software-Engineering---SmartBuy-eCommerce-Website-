var User = require('../models/user');
async = require("async");

module.exports = function(app) {

    app.post('/personalInfo', function (req, res) {
    User.findOne({ 'user.email' :  req.body.email }, function(err, user) {
      if (err) { console.log('error'); return done(err);}
      else if (!user) {
        console.log("User not found");
        res.redirect('/Account');
      }
      else { 
        user.updateUserProfile(req, res);
      }
    });
  });

    app.post('/paymentInfo', function (req, res) {
    User.findOne({ 'user.email' :  req.body.email }, function(err, user) {
      if (err) { console.log('error'); return done(err);}
      else if (!user) {
        console.log("User not found");
        res.redirect('/Account');
      }
      else { 
        user.updateUserPaymentInfo(req, res);
      }
    });
  });

    app.post('/addressInfo', function (req, res) {
    User.findOne({ 'user.email' :  req.body.email }, function(err, user) {
      if (err) { console.log('error'); return done(err);}
      else if (!user) {
        console.log("User not found");
        res.redirect('/Account');
      }
      else { 
        user.updateUserAddress(req, res);
      }
    });
  });

}


