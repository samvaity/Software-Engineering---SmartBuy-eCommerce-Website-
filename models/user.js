var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    user         : {
	username     		: String,
    	email        		: String,
    	password     		: String,
	role			: String,
	address      		: String,
	resetPasswordToken	: String,
  	resetPasswordExpires	: Date,
  	
  	payment_cardNumbe	: Number,
        payment_name        	: String,
        payment_expiryMonth 	: Number, 
        payment_expiryYear  	: Number, 
        payment_cvCode      	: Number,
        
        address_line1       	: String,
        address_line2       	: String,
        address_city        	: String, 
        address_state       	: String, 
        address_country     	: String,
        address_postCode    	: Number,
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

module.exports = mongoose.model('User', userSchema);
