var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var productSchema = mongoose.Schema({
    product : {
	    name  		 	  : String,
	    description  	  : String,
		quantity     	  : Number,
		price      	 	  : Number,
		category 		  : String,
		specifications 	  : String,
		discount	 	  : Number,
		discountStartDate : Date,
		discountEndDate	  : Date,
		couponsAplicable  : Boolean,
		sellerID 		  : String,
		noOfItemsSold 	  : Number,
		images 			  : String
		//img: { data: String, contentType: String, path: String, fileName: String }
	}
});

// create a field named productID for productSchema
/*productSchema.product.virtual('productID').get(function() {
    return this._id;
});
*/

productSchema.methods.updateProduct = function(request, response){
	//console.log(request.file);
	this.product.name = request.body.product_name;
	this.product.description = request.body.product_description;
	this.product.quantity = request.body.product_quantity;
	this.product.price = request.body.product_price;
	this.product.category = request.body.product_category;
	this.product.specifications = request.body.product_specifications;
	this.product.discount = request.body.product_discount;
	this.product.discountStartDate = request.body.product_startDate;
	this.product.discountEndDate = request.body.product_endDate;
	this.product.couponsAplicable = request.body.product_couponsApplicable;
	this.product.noOfItemsSold = 0;
	this.product.sellerID = request.user.user.email;
	this.images = '"img": '+JSON.stringify(request.file);

	this.product.save(function(err) {
                        if (err)
                            throw err;
                    });
	return "success";
	//response.redirect('/addInventory');

  /*upload(request,response,function(err) {
          if(err) {
              return res.end("Error uploading file.");
          }
	var writestream = gfs.createWriteStream({
        filename: request.files.upl.originalFilename
    });
    fs.createReadStream(request.files.upl.path).pipe(writestream);
 
    var newfile = writestream.on('close', function (file) {
	        // do something with `file`
	        //console.log(file);
	        //console.log(file.filename + ' Written To DB');
	        //this.product.images = JSON.stringify(file);
	        return file;
	    });
*/
   // console.log(request);
  //  this.product.images = util.inspect(writestream);
	//this.img.contentType = request.files.upl.headers.content-type;
    //this.img.path = request.files.upl.path;
    //this.img.fileName = request.files.upl.originalFilename;

	//this.putFile(request.files.upl.path, request.files.upl.originalFilename);
	

	//this.img.data = fs.readFileSync(request.files.upl.path);
    //this.img.contentType = request.files.upl.headers.content-type;
    //this.img.path = request.files.upl.path;
    //this.img.fileName = request.files.upl.originalFilename;

	//this.product.images
	
//});
};

module.exports = mongoose.model('Product', productSchema);
