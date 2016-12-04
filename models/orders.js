var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var orderSchema = mongoose.Schema({
    order         : 
    {
	userEmail    : String,
	shippingName : String,
	shippingAddress : String,
	shippingState : String,
	shipingCountry: String,
	shippingCity:String,
	shippingUserName: String,
	cartID : ObjectId,
	 
    }
});

module.exports = mongoose.model('Order', orderSchema);
