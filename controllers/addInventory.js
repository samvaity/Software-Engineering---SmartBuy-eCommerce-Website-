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
   
	app.get('/addInventory', commonserver.anypageAuth, function(request, response) {
    Category.find({"category.level" : {$ne : 1}},{"category": 1, "category.name": 1},function(err, categories){
      var tagline = request.user.user.username;
      var tags = [
        { name: 'My Account', ref:'/Account' },
        { name: 'My Orders', ref:'/Orders' },
        { name: 'Logout', ref:'/logout' }
      ];
      var nextPage = "#";
        response.render('addInventory.html', { 
  				user: request.user,
  				categories: categories,
          tagline: tagline,
          nextPage:nextPage,
          tags:tags,
  				message: request.flash('error in adding inventory') 
      });
    });
	});

  app.post('/addInventory', upload, function (req, res) {
    Product.findOne({$and: [{'product.name' : req.body.product_name}, {'product.sellerID' : req.user.user.email}]}, function(err, product) {
      var newProduct = new Product();
      if (err) { console.log('error'); return done(err);}
      if (product) {
        Category.find({"category.level" : {$ne : 1}},{"category": 1, "category.name": 1}, function(err, categories){
          // needed to display user and his options.. to be moved to a common page later
          var tagline = req.user.user.username;
          var tags = [
            { name: 'My Account', ref:'/Account' },
            { name: 'My Orders', ref:'/Orders' },
            { name: 'Logout', ref:'/logout' }
          ];
          var nextPage = "#";
          res.render('addInventory.html', { 
            user: req.user,
            categories: categories,
            tagline: tagline,
            nextPage:nextPage,
            tags:tags,
            message: 'Product already exists. Please add a new product.',
          });
        });
      } 
      else { 
        var newProduct = new Product();
        newProduct.updateProduct(req, res, gfs, '/sellerproducts');
      }
    });
  });
}
