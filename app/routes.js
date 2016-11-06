var User       = require('../app/models/user');
async = require("async");
var path = require('path'), fs = require('fs');
var crypto = require("crypto");
var nodemailer = require("nodemailer");

module.exports = function(app, passport,server) {
	
/* get for landing page*/
	app.get('/', auth, function(request, response) {
		var user = request.user;
		var tagline = user.user.username;
		var nextPage = "#";
		 var tags = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];
		response.render('index.html', {
      	user : user,
      	nextPage:nextPage,
        tagline: tagline,
        tags:tags
   		 });
	});

/* post for index page*/
	app.post('/', auth, function(request,response) {
		var user = request.user;
		var tagline = user.user.username;
		var nextPage = "#";
		var tags = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];
		response.render('index.html', {
      	user : user,
      	nextPage:nextPage,
        tagline: tagline,
        tags:tags
   		 });
	});

/*Get for my accounts page*/
	app.get('/Account', auth, function(request, response) {
		var user = request.user;
		var tagline = user.user.username;
		var nextPage = "#";
		 var tags = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];
		response.render('Account.html', {
      	user : user,
      	nextPage:nextPage,
        tagline: tagline,
        tags:tags
   		 });
	});

/*Get for search page*/
	app.get('/search', searchAuth, function(request, response) {
		var user = request.user;
		var tagline = user.user.username;
		var nextPage = "#";
		 var tags = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];
		response.render('index.html', {
      	user : user,
      	nextPage:nextPage,
        tagline: tagline,
        tags:tags
   		 });
	});

/*Post for search Page*/
		
	app.post('/search', searchAuth, function(request, response) {
		console.log(request.user);
		var user = request.user;
		var tagline = user.user.username;
		console.log(tagline);
		var nextPage = "#";
		var tags = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];
		response.render('search.html', {
      	user : user,
      	nextPage:nextPage,
        tagline: tagline,
        tags:tags
   		 });
	});

	app.get('/logout', function(request, response) {
		request.logout();
		response.redirect('/');
	});

//spl case for when user puts /login in the web url
	app.get('/login',  splAuth, function(request, response) {
			response.render('login.html', { message: request.flash('error') });
		});

//post for normal login
	app.post('/login', passport.authenticate('login', {
			successRedirect : '/', 
			failureRedirect : '/login', 
			failureFlash : true
		}));

/*Get for Signup */ 
	app.get('/signup', function(request, response) {
			response.render('signup.html', { message: request.flash('signuperror') });
		});

/*Post for signup*/
	app.post('/signup', passport.authenticate('signup', {
			successRedirect : '/login',
			failureRedirect : '/signup', 
			failureFlash : true 
		}));

	

/* Reset Password code*/

/*Forgot pwd*/
app.get('/forgot', function(req, res) {
  res.render('forgot.html', {
       user: req.user

  });
});

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
     /*   user.markModified(user);
         user.markModified(user);*/
/* User.markModified(user.resetPasswordToken);
 User.markModified(user.resetPasswordExpires);
*/
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
        subject: 'Node.js Password Reset',
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
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

/*End of forgot*/

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


var io = require('socket.io').listen(server);

var usernames = {};

io.sockets.on('connection', function (socket) {

  socket.on('adduser', function(username){
    socket.username = username;
    usernames[username] = username;
    io.sockets.emit('updateusers', usernames);
  });

  socket.on('disconnect', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
});

};


/*function to check for authenticated user*/
function auth(req, res, next) {
  if (req.isAuthenticated()) {  return next(); }
  	var tagline = "Login";
  	var nextPage = "/login";
	var tags = [];
   	res.render('index.html', {
			tagline: tagline,
			nextPage: nextPage,
			tags:tags
		});
 
}

/*redirection for search */
function searchAuth(req, res, next) {
  if (req.isAuthenticated()) {  return next(); }
  console.log("Not logged in");
  	var tagline = "Login";
  	var nextPage = "/login";
	var tags = [];
    res.render('search.html', {
			tagline: tagline,
			nextPage: nextPage,
			tags:tags
		});
 
}

/*special Authentication */
function splAuth(req, res, next) {
  if (!req.isAuthenticated()) { return next(); }
		res.redirect('/');
}
