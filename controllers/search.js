var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var commonserver = require('./commonserver');

module.exports = function(app, mongoose, Grid) {

	// *** app.get Not needed for search because fnctionality will be done by post. TO BE REMOVED later. ***/
	// Retrieves all products data and passes it to the view
	app.get('/search', commonserver.anypageAuth, function(request, response) { 
		/* gets all seller brands, to be dispplayed in refinement panel */
		User.find({"user.role": "seller"}, function(err, sellerbrands){
			Product.find(function(err, products){
			    response.render('search.html', { 
			    	user: request.user,
			        tagline: commonserver.getTagLine(request.user),
			        nextPage: "#",
			        products: products,
			        searchtext: "",
			        sellerfiltersapplied: "",
			        pricefiltersapplied: "",
			        tags: commonserver.getTags(),
			        sellers: sellerbrands,
			  		message: request.flash('error while loading data') 
			  	});
			});
		});
	});

	// Retrieves data relevant to the search query and passes it to the view
	app.post('/search', commonserver.anypageAuth, function(request, response) {
		console.log(request.body);
		var searchtext = request.body.search_text;
		var sellerBrandsFilter = request.body.seller;
		var sellerfiltersapplied = (request.body.sellername) ?  request.body.sellername : "";
		var priceFilters = (request.body.price) ? request.body.price : "";

		/* gets all seller brands, to be dispplayed in refinement panel */
		User.find({"user.role": "seller"}, function(err, sellerbrands){
			var productSubQuery = [];
			if(sellerbrands && searchtext){
				for(var i = 0; i < sellerbrands.length; i++) {
					if((sellerbrands[i].user.username).toLowerCase().indexOf(searchtext.toLowerCase()) != -1){
						productSubQuery.push({"product.sellerID": sellerbrands[i].user.email});
					}
				}
			}
			productSubQuery.push({"product.name" : {$regex : searchtext, $options:"$i"}});
			productSubQuery.push({"product.category" : {$regex : searchtext, $options:"$i"}});
			productSubQuery.push({"product.description" : {$regex : searchtext, $options:"$i"}});

			var productFieldsRetrieve = {"product.name" : 1, "product.category" : 1, "product.description" : 1,
										"product.price" : 1, "product.quantity" : 1, "product.sellerID" : 1}
			var productMainQuery = {$or: productSubQuery};
			/* search for the entered text in product.name, product.category, product.description, seller name fields.
				$options:$i makes the search case insensitive */
			/* Checks is the search text contains a seller/brandname. 
		   		If yes, get that sellers products from 'products' collection */
			Product.find(productMainQuery,productFieldsRetrieve, function(err, products){
				var finalproducts = [];
				// when any of the filter's are selected
				if((sellerBrandsFilter || priceFilters) && products){	
					// when any of the sellers are added as filters
					if(sellerBrandsFilter){
						for(var j = 0; j < products.length; j++) {
							var found = sellerBrandsFilter.indexOf(products[j]['product']['sellerID']);
							if(found > -1){
								if(priceFilters){
									if(Array.isArray(priceFilters)){
										//multiple price filters are applied
										for(var k = 0; k < priceFilters.length; k++){
											var priceLowerBound = parseFloat(priceFilters[k].split(" - ")[0].substring(1));
											var priceUpperBound = parseFloat(priceFilters[k].split(" - ")[1].substring(1));
											var productPrice = parseFloat(products[j]['product']['price']);
											if(productPrice && (priceLowerBound <= productPrice) && (productPrice <= priceUpperBound)){
												finalproducts.push(products[j]);
											}
										}
									}
									else{	//only one price filter is applied
										var priceLowerBound = parseFloat(priceFilters.split(" - ")[0].substring(1));
										var priceUpperBound = parseFloat(priceFilters.split(" - ")[1].substring(1));
										var productPrice = parseFloat(products[j]['product']['price']);
										if(productPrice && (priceLowerBound <= productPrice) && (productPrice <= priceUpperBound)){
											finalproducts.push(products[j]);
										}
									}
								}
								else{
									finalproducts.push(products[j]);
								}
							}
						}
					}
					// when any of the prices are added as filters
					else if(priceFilters){
						for(var j = 0; j < products.length; j++) {
							if(Array.isArray(priceFilters)){
								//multiple price filters are applied
								for(var k = 0; k < priceFilters.length; k++){
									var priceLowerBound = parseFloat(priceFilters[k].split(" - ")[0].substring(1));
									var priceUpperBound = parseFloat(priceFilters[k].split(" - ")[1].substring(1));
									var productPrice = parseFloat(products[j]['product']['price']);
									if(productPrice && (priceLowerBound <= productPrice) && (productPrice <= priceUpperBound)){
										finalproducts.push(products[j]);
									}
								}
							}
							else{	//only one price filter is applied
								var priceLowerBound = parseFloat(priceFilters.split(" - ")[0].substring(1));
								var priceUpperBound = parseFloat(priceFilters.split(" - ")[1].substring(1));
								var productPrice = parseFloat(products[j]['product']['price']);
								if(productPrice && (priceLowerBound <= productPrice) && (productPrice <= priceUpperBound)){
									finalproducts.push(products[j]);
								}
							}
						}
					}
				}
				// when filters are not selected
				else{
					finalproducts = products;
				}
				response.render('search.html', { 
	            	user : request.user,
			      	nextPage:"#",
			      	products: finalproducts,
			      	searchtext: searchtext,
			      	sellerfiltersapplied: sellerfiltersapplied,
			      	pricefiltersapplied: priceFilters,
			        tagline: commonserver.getTagLine(request.user),
			        tags:commonserver.getTags(),
			        sellers:sellerbrands,
	            	message: ''
	          	});
			});
		});
	});
}