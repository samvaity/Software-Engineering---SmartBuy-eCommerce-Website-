var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var commonserver = require('./commonserver');

module.exports = function(app, multer, mongoose, Grid) {
 
  var conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  var upload = multer({ storage : storage}).array('prodImages');
  var gfs;
  conn.once('open', function() {
    gfs = Grid(conn.db);
    app.set('gridfs',gfs);
  });
   
	app.get('/editInventory', commonserver.anypageAuth, function(request, response) {
    var product_id = request.param('productID');
    Category.find({"category.level" : {$ne : 1}},{"category": 1, "category.name": 1},function(err, categories){
      if (err){           // Error occured while fetching categories
        throw err;
      }
      else{
        var tagline = request.user.user.username;
        var tags = [
          { name: 'My Account', ref:'/Account' },
          { name: 'My Orders', ref:'/Orders' },
          { name: 'Logout', ref:'/logout' }
        ];
        var nextPage = "#";
        if(product_id != null){
          Product.findOne({"_id": mongoose.mongo.ObjectID(product_id)}, function(err, product){
            if (err){           // Error occured while fetching product
                throw err;
            }
            else{              // No error in fetching product
              response.render('editInventory.html', { 
                user: request.user,
                categories: categories,
                tagline: tagline,
                nextPage: nextPage,
                tags: tags,
                product: product, 
                message: request.flash('error in adding inventory') 
              });
            }
          });
        }
      }
    });
	});

  app.post('/editInventory', upload, function (req, res) {
    Product.findOne({$and: [{'product.name' : req.body.product_name}, {'product.sellerID' : req.user.user.email}]}, function(err, product) {
      var newProduct = new Product();
      if (err) { console.log('error'); return done(err);}
      else if (!product) {
        console.log("Product not found");
        res.redirect('/sellerproducts');
      }
      else { 
        //var newProduct = new Product();
        product.updateProduct(req, res, gfs, '/sellerproducts');
      }
    });
  });
}
