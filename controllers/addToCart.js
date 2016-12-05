var Cart = require('../models/Cart');
var commonserver = require('./commonserver');

module.exports = function(app) {

    //functionality implemnetation of adding the user's products to cart
	app.post('/addToCart',  commonserver.anypageAuth, function(req, res) {
    console.log("Is it coming here");
    console.log(req.body);
	var newCart = new Cart();
    console.log("after cart");
     newCart.cart.productID = req.body.productID;
     newCart.cart.userEmail = req.body.userEmail;
     newCart.cart.quantity = req.body.quantity;
     newCart.cart.productPrice = req.body.productPrice;
     newCart.cart.productName = req.body.productTitle;
     var str1 = "/productSpecs?productID=";
     var str2 = req.body.productID;
     var redirectTo = str1.concat(str2);
     console.log("dddddddddd");
     console.log(newCart);
     newCart.save(function(err) {
                if (!err)
                {
                    console.log("No error");
                   res.redirect(redirectTo);
                               
                }
                else
                {
                   response.render('webhome.html', { 
                    message: request.flash('Error in adding Cart')
                });
                }           
        });
   });

}
