var commonserver = require('./commonserver');
module.exports = function(app) {


//spl case for when user puts /login in the web url
    app.get('/navigate1',  function(request, response) {
		//console.log('navigate1');
            response.render('navigate1.html', 
      { error: request.flash('error') });
        });
		}