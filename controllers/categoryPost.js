var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var commonserver = require('./commonserver');
var sortBy = require('sort-by');
var fs = require('fs');var newGrid = require('../models/fsfiles');
var newGrid2 = require('../models/fsfiles');

module.exports = function(app, mongoose, Grid) {

	Grid.mongo = mongoose.mongo;
	var gfs = new Grid(mongoose.connection.db);

	function renderSearch(allproducts, request, response, sellerbrands, sortby, nextPage, searchtext, sellerfiltersapplied, priceFilters, message, category){
		/********** for pagination ******************/
	    var totalProducts = allproducts.length,
	        pageSize = 15,
	        pageCount = Math.ceil(totalProducts/pageSize),
	        currentPage = 1,
	        productsArrays = [], 
	        productsList = [];

		//split list into groups
	    while (allproducts.length > 0) {
	        productsArrays.push(allproducts.splice(0, pageSize));
	    }

	    //set current page if specifed as get variable (eg: /?page=2)
	    if (typeof request.body.page !== 'undefined') {
	        currentPage = +request.body.page;
	    }

	    //show list of students from group
	    if(productsArrays.length > 0){
	    	productsList = productsArrays[+currentPage - 1];
		}

		var user = (request.user) ? (request.user) : "";
		var category = (category) ? (category) : "";
	    /********************************************/
	    response.render('category.html', { 
	    	//for pagination
	        pageSize: pageSize,
	        totalProducts: totalProducts,
	        pageCount: pageCount,
	        currentPage: currentPage,
	        products: productsList,
	        appliedsortby: sortby,
	    	user: user,
	        tagline: commonserver.getTagLine(user),
	        nextPage: nextPage,
	        searchtext: category,
	        category: category,
	        sellerfiltersapplied: sellerfiltersapplied,
	        pricefiltersapplied: priceFilters,
	        tags: commonserver.getTags(user),
	        sellers: sellerbrands,
	  		message: message 
	  	});
	}

	// Retrieves data relevant to the search query and passes it to the view
	app.post('/category', function(request, response) {
		var searchtext = "";
		var category = request.body.category;
		var sellerBrandsFilter = request.body.seller;
		var sellerfiltersapplied = (request.body.sellername) ?  request.body.sellername : "";
		var priceFilters = (request.body.price) ? request.body.price : "";
		var pagenumber = request.body.page;
		var sortby = request.body.sortby; 
		var response1 = response;

		/* gets all seller brands, to be dispplayed in refinement panel */
		User.find({"user.role": "seller"}, function(err, sellerbrands){
			var productSubQuery = [];
			if(sellerbrands && category){
				for(var i = 0; i < sellerbrands.length; i++) {
					if((sellerbrands[i].user.username).toLowerCase().indexOf(category.toLowerCase()) != -1){
						productSubQuery.push({"product.sellerID": sellerbrands[i].user.email});
					}
				}
			}
			//productSubQuery.push({"product.name" : {$regex : searchtext, $options:"$i"}});
			//productSubQuery.push({"product.category" : {$regex : category, $options:"$i"}});
			//productSubQuery.push({"product.description" : {$regex : searchtext, $options:"$i"}});

			var productFieldsRetrieve = {"product.name" : 1, "product.category" : 1, "product.description" : 1,
										"product.price" : 1, "product.quantity" : 1, "product.sellerID" : 1}
			var productMainQuery = {$and: [{"product.quantity": { $gt: 0 }}, {"product.category" : {$regex : category, $options:"$i"}}]};
			/* search for the entered text in product.name, product.category, product.description, seller name fields.
				$options:$i makes the search case insensitive */
			/* Checks is the search text contains a seller/brandname. 
		   		If yes, get that sellers products from 'products' collection */

			Product.find(productMainQuery,productFieldsRetrieve, function(err, products){
				// Apply sorting on retrieved data

				if(sortby){
					products.sort(sortBy(sortby));
				}
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
											var condition = (priceUpperBound) ? ((priceLowerBound <= productPrice) && (productPrice <= priceUpperBound)) : (priceLowerBound <= productPrice);
											if((productPrice != null) && condition){
												finalproducts.push(products[j]);
											}
										}
									}
									else{	//only one price filter is applied
										var priceLowerBound = parseFloat(priceFilters.split(" - ")[0].substring(1));
										var priceUpperBound = parseFloat(priceFilters.split(" - ")[1].substring(1));
										var productPrice = parseFloat(products[j]['product']['price']);
										var condition = (priceUpperBound) ? ((priceLowerBound <= productPrice) && (productPrice <= priceUpperBound)) : (priceLowerBound <= productPrice);
										if((productPrice != null) && condition){
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

									var condition = (priceUpperBound) ? ((priceLowerBound <= productPrice) && (productPrice <= priceUpperBound)) : (priceLowerBound <= productPrice);
									if((productPrice != null) && condition){
										finalproducts.push(products[j]);
									}
								}
							}
							else{	//only one price filter is applied
								var priceLowerBound = parseFloat(priceFilters.split(" - ")[0].substring(1));
								var priceUpperBound = parseFloat(priceFilters.split(" - ")[1].substring(1));
								var productPrice = parseFloat(products[j]['product']['price']);
								var condition = (priceUpperBound) ? ((priceLowerBound <= productPrice) && (productPrice <= priceUpperBound)) : (priceLowerBound <= productPrice);
								if((productPrice != null) && condition){
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
				
				if(finalproducts.length == 0){ 	// no products found for the given search and filter results
					renderSearch(finalproducts, request, response1, sellerbrands, sortby, "#", searchtext, sellerfiltersapplied, priceFilters, '', category);
				}
				else{
					var allproducts = [];
					var retproducts = JSON.stringify(finalproducts);
					var counter = 0;

					finalproducts.forEach(function(product, index, prodArray){
						
						newGrid2.find({$and : [{"metadata.productname": product["product"]["name"]}, {"metadata.sellerID": product["product"]["sellerID"]},{"metadata.imagetype": "thumbnailimage"}]}).lean().exec(function(err, files) {
							var readStream, buffer = "";
							if(files[0]){
								// product has an associated thumbnail image
								// read file, buffering data as we go
						 		readStream = gfs.createReadStream({ _id: files[0]['_id'] });
						 		readStream.on("data", function (chunk) {
						            buffer += chunk;
						        });

						        // dump contents to console when complete
						        readStream.on("end", function () {
						        	counter = counter+1;
						            var imagepath = './public/productimages/'+product["_id"]+files[0]['filename'];
						            product["product"]["imagepath"] = imagepath.split('./public')[1];
						            
						            // save the image in a temp folder
						            var fs_write_stream1 = fs.createWriteStream(imagepath);
									var readstream1 = gfs.createReadStream({
										_id: files[0]['_id']
									});
									readstream1.pipe(fs_write_stream1);
						            allproducts.push(product);
						            if(counter == prodArray.length){
										// Apply sorting on retrieved data
										if(sortby){
											allproducts.sort(sortBy(sortby));
										}
										renderSearch(allproducts, request, response, sellerbrands, sortby, "#", searchtext, sellerfiltersapplied, priceFilters, request.flash('error while loading data'), category);
									}
						        });
							}
							else{
								counter = counter+1;
								// product doesn't have any thumbnail image
								allproducts.push(product);
								if(counter == prodArray.length){
									// Apply sorting on retrieved data
									if(sortby){
										allproducts.sort(sortBy(sortby));
									}
									renderSearch(allproducts, request, response, sellerbrands, sortby, "#", searchtext, sellerfiltersapplied, priceFilters, request.flash('error while loading data'), category);	
								}
							}
							
						});			
					});
				}
			});
		});
	});
}