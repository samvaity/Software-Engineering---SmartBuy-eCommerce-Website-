/* This file contains all common javascript functions that can be used with other js files
(server side only)*/

/* This function will check if the user is logged in, if not, then redirect to login page */
module.exports.anypageAuth = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

/*function to check for authenticated user*/
module.exports.auth = function (req, res, next) {
  if (req.isAuthenticated()) {  return next(); }
  	var tagline = "Login";
  	var nextPage = "/login";
	  var tags = [];
   	res.render('webhome.html', {
			tagline: tagline,
			nextPage: nextPage,
			tags:tags,
      searchtext: ""
		});

/*    res.redirect("/");*/
 
}


module.exports.cartAuth = function (req, res, next) {
  if (req.isAuthenticated()) {  return next(); }
    var tagline = "Login";
    var nextPage = "/login";
    var tags = [];
    res.render('shoppingCart.html', {
      tagline: tagline,
      nextPage: nextPage,
      tags:tags,
      searchtext: ""
    });
/*    res.redirect("/");*/
 
}

module.exports.splAuth =  function (req, res, next) {
  if (!req.isAuthenticated()) { return next(); }
		res.redirect('/');
}

/* functions for header bar */
module.exports.getTags = function(user) {
  var tags = "";
  if(user){
    tags = [
      { name: 'My Account', ref:'/Account' },
      { name: 'My Orders', ref:'/Orders' },
      { name: 'Logout', ref:'/logout' }
    ];
    return tags;
  } 
  else{
    tags = [
      { name: 'Login', ref:'/login' }];
    return tags;
  }
}
module.exports.getTagLine = function(user) {
  var tagline = "";
  if(user) {
    tagline = user.user.username;
  }  
  return tagline;
}
/******************************/