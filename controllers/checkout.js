var commonserver = require('./commonserver');

module.exports = function(app) {

       	app.get('/checkout', commonserver.auth, function(request, response) {

			var user = request.user;
			var tagline = user.user.username;
			var nextPage = "#";
			 var tags = [
		        { name: 'My Account', ref:'/Account' },
		        { name: 'My Orders', ref:'/Orders' },
		        { name: 'Logout', ref:'/logout' }
		    ];
			response.render('checkoutPage.html', {
		      	user : user,
		      	nextPage:nextPage,
		        tagline: tagline,
		        searchtext: "",
		        tags:tags
		   		 });
		});


}