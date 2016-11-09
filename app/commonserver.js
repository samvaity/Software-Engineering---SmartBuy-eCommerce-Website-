/* This file contains all common javascript functions that can be used with other js files
(server side only)*/
module.exports.auth = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}