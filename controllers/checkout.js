var commonserver = require('./commonserver');
var Cart = require('../models/Cart');
var User = require('../models/user');

module.exports = function(app) {

       	app.get('/checkout', commonserver.anypageAuth, function(request, response) 
       	{
			var user = request.user;
			var tagline = user.user.username;
			var nextPage = "#";
			 var tags = [
		        { name: 'My Account', ref:'/Account' },
		        { name: 'My Orders', ref:'/Orders' },
		        { name: 'Logout', ref:'/logout' }
		    ];
		    console.log(request.user.user.email);
		    var varUserEmail = request.user.user.email;
			Cart.find({"cart.userEmail": request.user.user.email}, function(err, orders) {
                    		if (err){           // Error occured while fetching categories
					        throw err;
					      }
					      else{
					      	if(orders != null){
							   console.log(orders[0]);
							   User.findOne({ 'user.email' :  request.user.user.email }, function(err, shippingUser) {
              					if (err) { console.log('error'); return done(err);}
             					  else { 
					              	console.log("comess ger")
					              	console.log(shippingUser)
					              // 	 shipping_username = shippingUser.user.shippingUsername,
									 shipping_email = shippingUser.user.email,
									 shipping_address1 = shippingUser.user.shippingAddress,
									 shipping_city = shippingUser.user.shippingCity,
									  shipping_State = shippingUser.user.shippingState,
									  shipping_PC = shippingUser.user.shippingPostalCode 
									  console.log(shippingUser.user.email);
									
									 response.render('checkoutPage.html', {
                                            user: request.user,
                                            tagline: tagline,
                                            nextPage: nextPage,
                                            orders: orders,
                                            varUserEmail : varUserEmail,
                                            searchtext: "",
                                            tags: tags,
                                            shippingUser:shippingUser,
                                            
                                            message: request.flash('error while retrieving cart')
                                        });

									}
					              
					            
							});
							 
				        	}

                    		}

       		});
				
		});



       	app.get('/checkout/deletCart', commonserver.anypageAuth, function(request, response) { 
       		var newCart = new Cart();	
		Cart.find({"cart.userEmail": request.user.user.email}, function(err, orders) {
                    		if (err){           // Error occured while fetching categories
					        throw err;
					      }
					      else{
					      	var uEmail = request.user.user.email;
					        var tagline = request.user.user.username;
					        var tags = [
					          { name: 'My Account', ref:'/Account' },
					          { name: 'My Orders', ref:'/Orders' },
					          { name: 'Logout', ref:'/logout' }
					        ];
					        var nextPage = "#";

					        if(orders != null){
					        	newCart.deleteCart(request, response, orders, '/Orders');
							           //console.log(orders[0]);
							           	response.redirect('/Orders');
                                        // No error in fetching cart
				            /*  response.render('shoppingCart.html', {
                                            user: request.user,
                                            tagline: tagline,
                                            nextPage: nextPage,
                                            orders: orders,
                                            uEmail: uEmail,
                                            searchtext: "",
                                            tags: tags,
                                            message: request.flash('error while retrieving cart')
                                        });*/
				           
				        }

                    }


                    		});
	});



}