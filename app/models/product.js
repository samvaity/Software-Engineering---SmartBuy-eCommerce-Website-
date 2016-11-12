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
		noOfItemsSold 	  : Number
	}
});

// create a field named productID for productSchema
/*productSchema.product.virtual('productID').get(function() {
    return this._id;
});
*/

productSchema.methods.updateProduct = function(request, response, gfs){
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

	this.product.save(function(err) {
		if(request.files.length > 0){
			for(var i=0; i<request.files.length;i++){
				var writeStream = gfs.createWriteStream({
		            filename: request.files[i].originalname,
		        	metadata: {"productname": request.body.product_name, "sellerID": request.user.user.email}
		    	});
		    	fs.createReadStream(request.files[i].path).pipe(writeStream);
			}
	    }
    });
	return "success";
};

module.exports = mongoose.model('Product', productSchema);
