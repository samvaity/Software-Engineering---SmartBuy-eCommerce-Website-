var User = require('../models/user');
async = require("async");
var commonserver = require('./commonserver');
var nodemailer = require("nodemailer");

module.exports = function(app,passport) {


//spl case for when user puts /login in the web url
    app.get('/login',  commonserver.splAuth, function(request, response) {
            response.render('login.html', 
      { error: request.flash('error') });
        });

//post for normal login
    app.post('/login', passport.authenticate('login', {
            successRedirect : '/', 
            failureRedirect : '/login', 
            failureFlash : true
        }));

    // GET /auth/facebook
/*Use passport.authenticate() as route middleware to authenticate the
request. The first step in Facebook authentication will involve
redirecting the user to facebook.com. After authorization, Facebook will
redirect the user back to this application at /auth/facebook/callback*/
        app.get('/auth/facebook',
            passport.authenticate('facebook',{ scope : 'email' }));

// GET /auth/facebook/callback
// Use passport.authenticate() as route middleware to authenticate the
// request. If authentication fails, the user will be redirected back to the
// login page. Otherwise, the primary route function function will be called,
// which, in this example, will redirect the user to the home page.
        app.get('/auth/facebook/callback',
         passport.authenticate('facebook', { 
                successRedirect : '/',  
                failureRedirect: '/login' }));

// GET /auth/google
// Use passport.authenticate() as route middleware to authenticate the
// request. The first step in Google authentication will involve
// redirecting the user to google.com. After authorization, Google
// will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope : ['profile', 'email'] }));

// GET /auth/google/callback
// Use passport.authenticate() as route middleware to authenticate the
// request. If authentication fails, the user will be redirected back to the
// login page. Otherwise, the primary route function function will be called,
// which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', { 
                successRedirect : '/',  
                failureRedirect: '/login' }));


    app.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });

}