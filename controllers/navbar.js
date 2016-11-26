var commonserver = require('./commonserver');
module.exports = function(app) {


//spl case for when user puts /login in the web url
    app.get('/navbar',  function(request, response) {
		//console.log('navigate1');
            response.render('navbar.html', 
      { error: request.flash('error') });
        });
		}
