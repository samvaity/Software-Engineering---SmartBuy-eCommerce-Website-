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
    //console.log(user);
		var nextPage = "#";
		 var tagsForBuyer = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];

    var tagsForSeller = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Products', ref:'/sellerproducts' },
        { name: 'Logout', ref:'/logout' }
    ];
     var tagsForAdmin = [
        { name: 'Manage Accounts', ref:'/Account' },
        { name: 'Manage Products', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];
    if(user.user.role == 'buyer' || user.user.role == ""){
		response.render('webhome.html', {
      	user : user,
      	nextPage:nextPage,
        tagline: tagline,
        searchtext: "",
        tags:tagsForBuyer
   		 });
  }
    else if(user.user.role == 'seller')
    {
      response.redirect('/sellerproducts');
    }
    else if(user.user.role == 'admin')
    {
    response.render('sellerHomepage.html', {
          user : user,
          nextPage:nextPage,
          tagline: tagline,
          searchtext: "",
          tags:tagsForAdmin
         });
    }
	});

/* post for index page*/
	/*app.post('/', commonserver.auth, function(request,response) {
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
*/

/*Get for my accounts page*/
	app.get('/Account', commonserver.auth, function(request, response) {
		var user = request.user;
		var tagline = user.user.username;
		var nextPage = "#";

    var tagsForBuyer = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];

    var tagsForSeller = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Products', ref:'/sellerproducts' },
        { name: 'Logout', ref:'/logout' }
    ];

    var tagsForAdmin = [
        { name: 'Manage Accounts', ref:'/Account' },
        { name: 'Manage Products', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
    ];
		//  var tags = [
    //     { name: 'My Account', ref:'/Account' },
    //     { name: 'My Orders', ref:'/Orders' },
    //     { name: 'Logout', ref:'/logout' }
    // ];

    if(user.user.role == 'buyer')
    {
        response.render('Account.html', {
          user : user,
          nextPage:nextPage,
          tagline: tagline,
          tags:tagsForBuyer,
          searchtext: "",
        });
      }
    
    else if(user.user.role == 'admin')
    {
        response.render('Adminaccount.html', {
          user : user,
          nextPage:nextPage,
          tagline: tagline,
          tags:tagsForAdmin,
          searchtext: "",
        });
      }

    else
    {
        response.render('Saccount.html', {
            user : user,
            nextPage:nextPage,
            tagline: tagline,
            tags:tagsForSeller,
            searchtext: "",
          });
      }

	});

/*Get for Dummy search page*/
	/*app.get('/search', searchAuth, function(request, response) {
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
*/
/*Post for search Page*/
/*		
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
*/
/* to handle 404 error pages*/
  app.use(function(req, res) {
     res.status(400);
     res.render('404.html', {title: '404: Page Not Found'});
  });
  
  /* to handle 500 error pages*/
  app.use(function(error, req, res, next) {
     res.status(500);
     res.render('500.html', {title: '500: Server Error'});
  });
/*
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
});*/

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
