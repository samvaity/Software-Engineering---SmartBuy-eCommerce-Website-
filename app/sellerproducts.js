var Product = require('../app/models/product');
var User = require('../app/models/user');
var Category = require('../app/models/category');
var commonserver = require('./commonserver');

module.exports = function(app, server, multer, mongoose, Grid, fs, configDB) {

	/* Retrieves all products belonging to the logged in user/seller and renders them on sellerproducts.html */
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

	/* Retrieves the product to be deleted from the database and passes it to deleteProduct method in product.js model. 
	   Upon successful product deletion renders an updated sellerproducts.html */
	  /***** find out if app.delete can be used somehow ******/
	app.get('/placeholder', commonserver.anypageAuth, function(request, response) { 
		var product_id = request.param('productID');		// Fetches productID from the querystring parameter		
		var newProduct = new Product();	
		Product.findOne({"_id": mongoose.mongo.ObjectID(product_id)}, function(err, product){
			if (err){						// Error occured while fetching product
		        throw err;
			}
		    else if(product == null){      // Product not found
		    	console.log("Error occured while deleting product");
        		response.redirect('/sellerproducts');
		    }
		    else{						   // Product found
		    	returnValue = newProduct.deleteProduct(product);
		    	if(returnValue == "success"){
          			response.redirect('/sellerproducts');
          		}
          		else{
          			console.log("Error occured while deleting product");
        			response.redirect('/sellerproducts');
          		}  
		    }
		});
	});
}