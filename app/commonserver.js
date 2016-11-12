/* This file contains all common javascript functions that can be used with other js files
(server side only)*/

/* This function will check if the user is logged in, if not, then redirect to login page */
module.exports.auth = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}