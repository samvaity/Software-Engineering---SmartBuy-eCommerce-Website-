var Product = require('../app/models/product');
var User = require('../app/models/user');
var Category = require('../app/models/category');

module.exports = function(app, server, multer, mongoose, Grid, fs, configDB) {

  var Schema = mongoose.Schema;
  mongoose.createConnection('mongodb://localhost/smartbuy');
  var conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  // implemented for saving images.. not is use currently
  /*var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  var upload = multer({ storage : storage}).single('upl');

  var gfs;

  conn.once('open', function() {
    console.log('open');
    gfs = Grid(conn.db);
    app.set('gridfs',gfs);
  });
*/

  var options="";
  Category.find({},function(err, category){
      //response.send('index',{docs:docs});
      
     var jsoncategory = JSON.parse(JSON.stringify(category));
      for (var i = 0, len = category.length; i < len; i++) {
        if(jsoncategory[i].level != "1"){
          var name = jsoncategory[i].name;
            options += '<option value = "' + name + '">' + name + '</option>';
        } 
      }
  });         
	app.get('/addInventory', auth, function(request, response) {
    response.render('addInventory.html', { 
				user: request.user,
				category: options,
				message: request.flash('error in adding inventory') });
    });
	
	
  	app.post('/addInventory',function(req,res){
      	Product.findOne({'product.name' : req.body.product_name, 'product.sellerID' : req.user.user.email}, function(err, product) {
            var newProduct = new Product();
           /// console.log(product);
    	    if (err) { console.log('error'); return done(err);}
            if (product) {
                res.render('addInventory.html', { 
                   category: options,
					         message: 'Product already exists. Please add a new product.',
				        });
            } 
            else {
                
                var newProduct = new Product();
                newProduct.updateProduct(req, res);
                /*newProduct.product.name = req.body.product_name;
				newProduct.product.description = req.body.product_description;
				newProduct.product.quantity = req.body.product_quantity;
				newProduct.product.price = req.body.product_price;
				newProduct.product.category = req.body.product_category;
				newProduct.product.specifications = req.body.product_specifications;
				newProduct.product.discountStartDate = req.body.product_startDate;
				newProduct.product.discountEndDate = req.body.product_endDate;
				newProduct.product.couponsAplicable = req.body.product_couponsApplicable;
				newProduct.product.noOfItemsSold = 0;
				newProduct.product.sellerID = req.user.user.email;
				newProduct.product.save(function(err) {
	                        if (err)
	                            throw err;
	                    });
						res.redirect('/addInventory');*/
				/*
                upload(req,res,newProduct,function(err) {

                 	
			          if(err) {
			              return res.end("Error uploading file.");
			          }
			          // console.log(req);
			          // console.log(req.files.userPhoto.path);
			          // console.log(req.files.userPhoto.originalFilename);

			          var writeStream = gfs.createWriteStream({
			            filename: req.files.upl.originalFilename
			          });

			          fs.createReadStream(req.files.upl.path).pipe(writeStream);
                      //newProduct.updateProduct(req, res);
                      console.log(newProduct);
                      newProduct.images = JSON.stringify(req.files);
                      newProduct.product.save(function(err) {
	                        if (err)
	                            throw err;
	                    });
						res.redirect('/addInventory');
					});
					
            	*/
            	
            	}
        });
  });
}

function auth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
