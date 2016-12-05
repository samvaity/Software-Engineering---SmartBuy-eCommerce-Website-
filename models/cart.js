var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var cartSchema = mongoose.Schema({
    cart         : 
    {
	userEmail    : String,
	quantity	 : Number,
	productID    : ObjectId,
	productPrice : Number, 
	productName	  : String
	 
    }
});

cartSchema.methods.deleteCart = function(request, response, orders,  redirectTo){
	console.log(orders[0])
	var ordersCounter = orders.length;
	orders.forEach(function(cart){	
		cart.remove(function(err){
		if (err){ console.log("error in deleting cart"); } 
		else { 
		    ordersCounter--; 
			console.log("cart deleted successfully"); 
			if(ordersCounter == 0) { return }
			} 
		});
	});

}

module.exports = mongoose.model('Cart', cartSchema);
