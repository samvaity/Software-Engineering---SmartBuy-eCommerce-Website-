var Product = require('../models/product');
var Comment = require('../models/comment');
var commonserver = require('./commonserver');
module.exports = function(app) {

/*Get for Product Specs */ 
	app.get('/productSpecs',commonserver.anypageAuth, function(request, response) {
		var product_id = request.param('productID');	
		Product.find({"_id" : product_id},function(err, product){
		if (err){						// Error occured while fetching product
		        throw err;
				}
		if(product){
			 Comment.find({"comment.productID" : product_id},function(err, comments){
			 var tagline = request.user.user.username;
     		 var tags = [
	        { name: 'My Account', ref:'/Account' },
	        { name: 'My Orders', ref:'/Orders' },
	        { name: 'Logout', ref:'/logout' }
	      		];

      		var nextPage = "#";
			//console.log(comments[0]);
			console.log("After this");
			console.log(request.user.user.role);
		 	response.render('productSpecs.html', { 
						productName:product[0].product.name,
						productSpecification:product[0].product.specifications,
						productDescription:product[0].product.description,
						productPrice:product[0].product.price,
						product:product[0],
						tagline: tagline,
						searchtext: "",
		         		nextPage:nextPage,
		         		comments:comments,
		          		tags:tags
						});

		 	});
			}
		});
	});







}