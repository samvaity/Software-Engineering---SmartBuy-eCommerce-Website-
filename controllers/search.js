var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var commonserver = require('./commonserver');
var sortBy = require('sort-by');
var fs = require('fs');
var newGrid = require('../models/fsfiles');

module.exports = function(app, mongoose, Grid) {

	Grid.mongo = mongoose.mongo;
	var gfs = new Grid(mongoose.connection.db);

	function renderSearch(allproducts, request, response, sellerbrands, sortby, nextPage, searchtext, sellerfiltersapplied, priceFilters, message){
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
	    /********************************************/
	    
	    response.render('search.html', { 
	    	//for pagination
	        pageSize: pageSize,
	        totalProducts: totalProducts,
	        pageCount: pageCount,
	        currentPage: currentPage,
	        products: productsList,
	        appliedsortby: sortby,
	    	user: user,
	        tagline: commonserver.getTagLine(request.user),
	        nextPage: nextPage,
	        searchtext: searchtext,
	        sellerfiltersapplied: sellerfiltersapplied,
	        pricefiltersapplied: priceFilters,
	        tags: commonserver.getTags(request.user),
	        sellers: sellerbrands,
	  		message: message 
	  	});
	}

	// *** app.get Not needed for search because fnctionality will be done by post. TO BE REMOVED later. ***/
	// Retrieves all products (whose quantity is greater than zero) data and passes it to the view
	app.get('/search', function(request, response) { 
		var retproducts;
		var sortby = request.body.sortby; 
		/* gets all seller brands, to be dispplayed in refinement panel */
		User.find({"user.role": "seller"}, function(err, sellerbrands){
			Product.find({ "product.quantity": { $gt: 0 }}, function(err, products){
				// Apply sorting on retrieved data
				if(request.body.sortby){
					products.sort(sortBy(request.body.sortby));
				}
				
				for(var x=0; x<products.length; x++){
					var imagefile = [];
					retproducts = JSON.stringify(products);
					var productno = x;
					var allproducts = [];
					
					(function(x){
						newGrid.find({$and : [{"metadata.productname": products[x].product.name}, {"metadata.sellerID": products[x].product.sellerID},{"metadata.imagetype": "thumbnailimage"}]}).lean().exec(x, function(err, files) {
						 			
							var retproducts1 = JSON.parse(retproducts);
						 	var readStream, buffer = "";
						 	if(files[0]){
						 		// read file, buffering data as we go
						 		readStream = gfs.createReadStream({ _id: files[0]['_id'] });
						 		readStream.on("data", function (chunk) {
						            buffer += chunk;
						        });

						        // dump contents to console when complete
						        readStream.on("end", function () {
						            var imagepath = './public/productimages/'+retproducts1[x]["_id"]+files[0]['filename']
						            retproducts1[x]["product"]["imagepath"] = imagepath.split('./public')[1];
						            
						            // save the image in a temp folder
						            var fs_write_stream1 = fs.createWriteStream(imagepath);
									var readstream1 = gfs.createReadStream({
										_id: files[0]['_id']
									});
									readstream1.pipe(fs_write_stream1);									
						            allproducts.push(retproducts1[x]);
						            
						            if(x == (retproducts1.length -1)){
						            	// Apply sorting on retrieved data
										if(request.body.sortby){
											allproducts.sort(sortBy(request.body.sortby));
										}
						            	renderSearch(allproducts, request, response, sellerbrands, sortby, "#", "", "", "", request.flash('error while loading data'));
						            }
						        });

						 	}
						 	else{
						 		// no files present
						 		allproducts.push(retproducts1[x]);
						 		if(x == (retproducts1.length -1)){
						 			// Apply sorting on retrieved data
									if(request.body.sortby){
										allproducts.sort(sortBy(request.body.sortby));
									}
					            	renderSearch(allproducts, request, response, sellerbrands, sortby, "#", "", "", "", request.flash('error while loading data'));
					            }
						 	}
					    });
					})(x);
				}         
			});
		});
	});

	
}