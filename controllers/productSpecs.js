var Product = require('../models/product');
var Comment = require('../models/comment');
var commonserver = require('./commonserver');
var fs = require('fs');
var newGrid = require('../models/fsfiles');

module.exports = function(app, mongoose, Grid) {
	Grid.mongo = mongoose.mongo;
	var gfs = new Grid(mongoose.connection.db);

/*Get for Product Specs */ 
	app.get('/productSpecs', function(request, response) {
		var product_id = request.param('productID');	
		var sessionEmail = request.user.user.email;
		console.log(sessionEmail);
		Product.find({"_id" : product_id},function(err, product){
			if (err){						// Error occured while fetching product
			        throw err;
			}
			else if(product){

				Comment.find({"comment.productID" : product_id},function(err, comments){

				 	newGrid.find({$and : [{"metadata.productname": product[0].product.name}, {"metadata.sellerID": product[0].product.sellerID},{"metadata.imagetype": "largeimage"}]}).lean().exec(function(err, files) {
						var readStream, buffer = "";
				 		var largeImages = [];
				 		if(err){
				 			throw err;
				 		}
				 		else if(files.length != 0){
				 			console.log(files);
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
	
						            	product[0]["product"]["imagepath"] = largeImages;
										var user = (request.user) ? (request.user) : "";
						            	var tagline = (user) ? (request.user.user.username) : "";
						            	var userRole = (user) ? (request.user.user.role) : "";
							      		var nextPage = "#";
									 	response.render('productSpecs.html', { 
									 		productName:product[0].product.name,
											productSpecification:product[0].product.specifications,
											productDescription:product[0].product.description,
											productPrice:product[0].product.price,
											product:product[0],
											tagline: commonserver.getTagLine(request.user),
											images: largeImages,
											user: user,
											userRole: userRole,
							         		nextPage:nextPage,
							         		comments:comments,
							         		searchtext: "",
							          		tags:commonserver.getTags(request.user)
										});
						            }
						        });
			                });
				 		}
				 		else{
				 			// No images found
				 			var user = (request.user) ? (request.user) : "";
			            	var tagline = (user) ? (request.user.user.username) : "";
			            	var userRole = (user) ? (request.user.user.role) : "";

				      		var nextPage = "#";
						 	response.render('productSpecs.html', { 
								productName:product[0].product.name,
								productSpecification:product[0].product.specifications,
								productDescription:product[0].product.description,
								productPrice:product[0].product.price,
								product:product[0],
								tagline: commonserver.getTagLine(request.user),
								searchtext: "",
								user: user,
								sessionEmail : sessionEmail,
								images: largeImages,
								userRole: userRole,
				         		nextPage:nextPage,
				         		comments:comments,
				          		tags:commonserver.getTags(request.user)
							});
				 		}
				 	});
				});
			}
		});
	});
}