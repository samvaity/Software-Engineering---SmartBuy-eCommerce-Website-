var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var commentSchema = mongoose.Schema({
    cart         : 
    {
	userEmail    : String,
	quantity	 : Number,
	productID    : ObjectId,
	productPrice : Number, 
	productName	  : String
	 
    }
});

module.exports = mongoose.model('Cart', commentSchema);
