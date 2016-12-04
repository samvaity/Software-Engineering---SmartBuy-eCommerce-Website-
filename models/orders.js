var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var commentSchema = mongoose.Schema({
    order         : 
    {
	userEmail    : String,
	shippingAddress : String,
	shippingState : String,
	shipingCountry: String,
	shippingCity:String,
	shippingUserName: String,
	cartID : ObjectId,
	 
    }
});

module.exports = mongoose.model('Cart', commentSchema);
