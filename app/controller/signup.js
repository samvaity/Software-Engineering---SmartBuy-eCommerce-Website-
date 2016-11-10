module.exports = function(app, passport, server) {

/*Get for Signup */ 
	app.get('/signup', function(request, response) {
			response.render('signup.html', { error: request.flash('signuperror') });
		});

/*Post for signup*/
	app.post('/signup', passport.authenticate('signup', {
			successRedirect : '/login',
			failureRedirect : '/signup', 
			failureFlash : true 
		}));



	}