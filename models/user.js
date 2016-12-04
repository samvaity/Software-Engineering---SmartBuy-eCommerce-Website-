var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    user         : {
	username     		    : String,
    email        		    : String,
    password     	    	: String,
	role			        : String,
	address      	    	: String,
	resetPasswordToken	    : String,
  	resetPasswordExpires	: Date,
  	
  	payment_cardNumbe	    : Number,
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

    shippingName : String,
    shippingAddress : String,
    shippingState : String,
    shipingCountry: String,
    shippingCity:String,
    shippingUsername: String,
    shippingPostalCode: String,
    shippingEmail : String

    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

userSchema.methods.updateUserProfile = function(request, response){

	this.user.username = request.body.username;
    
    this.user.save(function(err) {
          if(!err)
          {
            response.redirect('/Account');
          }
          else
          {
              request.flash('error', 'Could not save!');
          }
        });
	
};


userSchema.methods.updateShippingDetails= function(request, response){
console.log("calling the fun")
  this.user.shippingUsername = request.body.shipping_username;
  this.user.shippingCity = request.body.shipping_city;
  this.user.shippingState = request.body.shipping_State;
  this.user.shippingAddress = request.body.shipping_address1;
  this.user.shippingPostalCode = request.body.shipping_PC;
  this.user.shippingEmail = request.body.shipping_email;

    this.user.save(function(err) {
          if(!err)
          {
            response.redirect('/checkout');
          }
          else
          {
              request.flash('error', 'Could not save!');
          }
        });
  
};



userSchema.methods.updateUserPaymentInfo = function(request, response){
    
	// this.user.payment.push({cardNumber : request.body.cardNumber, 
    //                         cvCode : request.body.cvCode,
    //                         expiryMonth : request.body.expiryMonth,
	//                         expiryYear : request.body.expiryYear,
	//                         name : request.body.name});

    this.user.payment_cardNumber = request.body.cardNumber;
    this.user.payment_cvCode = request.body.cvCode;
    this.user.payment_expiryMonth = request.body.expiryMonth;
    this.user.payment_expiryYear = request.body.expiryYear;
    this.user.payment_name = request.body.name;

    this.user.save(function(err,user) {
          if(!err)
          {
            console.log(user)
            response.render('Account.html', { user : user });
          }
          else
          {
              request.flash('error', 'Could not save!');
          }
        });
	
};

userSchema.methods.updateUserAddress = function(request, response){

    this.user.address_line1 = request.body.line1;
    this.user.address_line2 = request.body.line2;
    this.user.address_city = request.body.city;
    this.user.address_state = request.body.state;
    this.user.address_country = request.body.country;
    this.user.address_postCode = request.body.postCode;


    this.user.save(function(err) {
          if(!err)
          {
            response.redirect('/Account');
          }
          else
          {
              request.flash('error', 'Could not save!');
          }
        });
	
};

module.exports = mongoose.model('User', userSchema);
