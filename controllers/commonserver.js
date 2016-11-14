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
   	res.render('index.html', {
			tagline: tagline,
			nextPage: nextPage,
			tags:tags
		});
 
}

module.exports.splAuth =  function (req, res, next) {
  if (!req.isAuthenticated()) { return next(); }
		res.redirect('/');
}