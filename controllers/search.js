var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var commonserver = require('./commonserver');

module.exports = function(app, mongoose, Grid) {

	// *** app.get Not needed for search because fnctionality will be done by post. TO BE REMOVED later. ***/
	// Retrieves data relevant to the search query and passes it to the view
	app.get('/search', commonserver.anypageAuth, function(request, response) { 
		Product.find(function(err, products){
		    response.render('search.html', { 
		    	user: request.user,
		        tagline: commonserver.getTagLine(request.user),
		        nextPage: "#",
		        products: products,
		        searchtext: "",
		        tags: commonserver.getTags(),
		  		message: request.flash('error while loading data') 
		  	});
		});
	});

	// Retrieves data relevant to the search query and passes it to the view
	app.post('/search', commonserver.anypageAuth, function(request, response) {
		var searchtext = request.body.search_text;
		/* search for the entered text in product.name, product.category, product.description, seller name fields.
			$options:$i makes the search case insensitive */

		/* Checks is the search text contains a seller/brandname. 
		   If yes, get that sellers products from 'products' collection */	
		var searchQuery = {"user.username": {$regex : searchtext, $options:"$i"}};
		User.find(searchQuery, function(err, sellers){
			var productSubQuery = [];
			if(sellers.length != 0){
				for(var i = 0; i < sellers.length; i++) {
					productSubQuery.push({"product.sellerID": sellers[i].user.email});
				}
			}
			productSubQuery.push({"product.name" : {$regex : searchtext, $options:"$i"}});
			productSubQuery.push({"product.category" : {$regex : searchtext, $options:"$i"}});
			productSubQuery.push({"product.description" : {$regex : searchtext, $options:"$i"}});

			var productMainQuery = {$or: productSubQuery};

			Product.find(productMainQuery, function(err, products){
				response.render('search.html', { 
	            	user : request.user,
			      	nextPage:"#",
			      	products: products,
			      	searchtext: searchtext,
			        tagline: commonserver.getTagLine(request.user),
			        tags:commonserver.getTags(),
	            	message: ''
	          	});
	   		});
		});
	});
}