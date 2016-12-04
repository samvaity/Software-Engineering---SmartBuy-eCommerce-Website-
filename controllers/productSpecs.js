var Product = require('../models/product');
var Comment = require('../models/comment');
var commonserver = require('./commonserver');
var fs = require('fs');
var newGrid = require('../models/fsfiles');

module.exports = function(app, mongoose, Grid) {
	Grid.mongo = mongoose.mongo;
	var gfs = new Grid(mongoose.connection.db);

/*Get for Product Specs */ 
	app.get('/productSpecs',commonserver.auth, function(request, response) {
		var product_id = request.param('productID');	
		Product.find({"_id" : product_id},function(err, product){
		if (err){						// Error occured while fetching product
		        throw err;
				}
		if(product){
			Comment.find({"comment.productID" : product_id},function(err, comments){
			 	newGrid.find({$and : [{"metadata.productname": product[0].product.name}, {"metadata.sellerID": product[0].product.sellerID},{"metadata.imagetype": "largeimage"}]}).lean().exec(function(err, files) {
					var readStream, buffer = "";
			 		var largeImages = [];
			 		if(err){
			 			throw err;
			 		}
			 		else if(files){
			 			files.forEach(function(file, index, filesArray){
		                    // read file, buffering data as we go
					 		readStream = gfs.createReadStream({ _id: file['_id'] });
					 		readStream.on("data", function (chunk) {
					            buffer += chunk;
					        });

					        // dump contents to console when complete
					        readStream.on("end", function () {
					            var imagepath = './public/productimages/'+product[0]["_id"]+file['filename'];
					            largeImages.push(imagepath.split('./public')[1]);
					            //product[0]["product"]["imagepath"] = imagepath.split('./public')[1];
					            
					            // save the image in a temp folder
					            var fs_write_stream1 = fs.createWriteStream(imagepath);
								var readstream1 = gfs.createReadStream({
									_id: file['_id']
								});
								readstream1.pipe(fs_write_stream1);									

					            if(index === (filesArray.length - 1)){
					            	console.log(largeImages);
					            	product[0]["product"]["imagepath"] = largeImages;
					            	console.log(product);
					            	var tagline = request.user.user.username;
						     		var tags = [
							        { name: 'My Account', ref:'/Account' },
							        { name: 'My Orders', ref:'/Orders' },
							        { name: 'Logout', ref:'/logout' }];
						      		var nextPage = "#";
								 	response.render('productSpecs.html', { 
										productName:product[0].product.name,
										productSpecification:product[0].product.specifications,
										productDescription:product[0].product.description,
										productPrice:product[0].product.price,
										product:product[0],
										images: largeImages,
										tagline: tagline,
										searchtext: "",
						         		nextPage:nextPage,
						         		comments:comments,
						          		tags:tags
									});
					            }
					        });
		                });
			 		}
			 		else{
			 			// No images found
			 			var tagline = request.user.user.username;
			     		var tags = [
				        { name: 'My Account', ref:'/Account' },
				        { name: 'My Orders', ref:'/Orders' },
				        { name: 'Logout', ref:'/logout' }];

			      		var nextPage = "#";
						//console.log(comments[0]);
						console.log("all images found");
						console.log(product);
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
			 		}
			 	});
			});
			}
		});
	});
}