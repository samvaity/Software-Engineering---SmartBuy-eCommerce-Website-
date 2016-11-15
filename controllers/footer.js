module.exports = function(app) {
 	app.get('/footer', function(request, response) {
  response.render('footer.html');

 	});
 }