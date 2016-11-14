var User       = require('../models/user');
async = require("async");
var path = require('path'), fs = require('fs');
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var commonserver = require('./commonserver');
module.exports = function(app, passport,server) {
	
/* get for landing page*/
	app.get('/', commonserver.auth, function(request, response) {
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
	app.post('/', commonserver.auth, function(request,response) {
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

/*Get for my Dummy accounts page*/
	app.get('/Account', commonserver.auth, function(request, response) {
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

/*Get for Dummy search page*/
	app.get('/search', searchAuth, function(request, response) {
		var user = request.user;
		var tagline = user.user.username;
		var nextPage = "#";
		 var tags = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];
		response.render('searchOld.html', {
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
/*function auth(req, res, next) {
  if (req.isAuthenticated()) {  return next(); }
  	var tagline = "Login";
  	var nextPage = "/login";
	var tags = [];
   	res.render('index.html', {
			tagline: tagline,
			nextPage: nextPage,
			tags:tags
		});
 
}*/

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
/*function splAuth(req, res, next) {
  if (!req.isAuthenticated()) { return next(); }
		res.redirect('/');
}*/