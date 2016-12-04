var mongoose = require('mongoose');
var Product = mongoose.model('Product','productSchema');
var Cart = require('../models/Cart');

var commonserver = require('./commonserver');
module.exports = function(app) {

        app.get('/Orders', commonserver.anypageAuth, function(request, response) {
                    //console.log(request);
                    console.log("is it come")
                    console.log(request.user)
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
                            //console.log(user.role)
					        if(orders != null){
							           console.log(orders[0]);
                                        // No error in fetching cart
				              response.render('shoppingCart.html', {
                                            user: request.user,
                                            tagline: tagline,
                                            nextPage: nextPage,
                                            orders: orders,
                                            uEmail: uEmail,
                                            searchtext: "",
                                            tags: tags,
                                            message: request.flash('error while retrieving cart')
                                        });
				           
				        }

                    }


                    		});
						});
                            /*if (orders != null) {
                                console.log(orders.cart.productID)
                                Product.findOne({"_id": orders.cart.productID}, function(err, product) {
                                    if (err) { // Error occured while fetching product
                                        throw err;
                                    } else {

                                        var tagline = request.user.user.username;
                                        var uEmail = request.user.user.email;
                                        var tags = [{
                                            name: 'My Account',
                                            ref: '/Account'
                                        }, {
                                            name: 'My Orders',
                                            ref: '/Orders'
                                        }, {
                                            name: 'Logout',
                                            ref: '/logout'
                                        }];
                                        var nextPage = "#";
                                        console.log(orders);
                                        response.render('shoppingCart.html', {
                                            user: request.user,
                                            tagline: tagline,
                                            nextPage: nextPage,
                                            orders: orders,
                                            uEmail: uEmail,
                                            tags: tags,
                                            message: request.flash('error while retrieving cart')
                                        });
                                    } 
                                });
                            });                    //lets try by first ading a  cart to this user then trying to retriev
*/



                    }