var User       = require('../app/models/user');
async = require("async");
var path = require('path'), fs = require('fs');

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
