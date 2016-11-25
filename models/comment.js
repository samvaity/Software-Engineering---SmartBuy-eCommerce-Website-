var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var commentSchema = mongoose.Schema({
    comment         : 
    {
	userEmail    : String,
	text		 : String,
	productID    : ObjectId,
	title		 : String,
	rating 		 : Number
	 /*,
   	type		 : String,
	isSpam       : Boolean,
	*/
    }
});

module.exports = mongoose.model('Comment', commentSchema);
