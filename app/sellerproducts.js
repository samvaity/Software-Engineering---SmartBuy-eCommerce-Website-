var Product = require('../app/models/product');
var User = require('../app/models/user');
var Category = require('../app/models/category');
var commonserver = require('./commonserver');

module.exports = function(app, server, multer, mongoose, Grid, fs, configDB) {
	app.get('/sellerproducts', commonserver.anypageAuth, function(request, response) { 
		Product.find({"product.sellerID" : request.user.user.email}, function(err, products){
	    	var tagline = request.user.user.username;
	      	var tags = [
	        	{ name: 'My Account', ref:'/Account' },
	        	{ name: 'My Orders', ref:'/Orders' },
	        	{ name: 'Logout', ref:'/logout' }
	    	];
			var nextPage = "#";
		    response.render('sellerproducts.html', { 
		  		user: request.user,
		        tagline: tagline,
		        nextPage: nextPage,
		        products: products,
		        tags:tags,
		  		message: request.flash('error in adding inventory') 
		  	});
		});
	});
}