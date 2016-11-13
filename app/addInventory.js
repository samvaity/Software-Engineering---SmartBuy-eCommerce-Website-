var Product = require('../app/models/product');
var User = require('../app/models/user');
var Category = require('../app/models/category');
var commonserver = require('./commonserver');

module.exports = function(app, server, multer, mongoose, Grid, fs, configDB) {
 
  var upload = multer()

  var Schema = mongoose.Schema;
  mongoose.createConnection('mongodb://localhost/smartbuy');
  var conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  // implemented for saving images.. not is use currently
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
    console.log('open');
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
        returnValue = newProduct.updateProduct(req, res, gfs);
        if(returnValue == "success")    
          res.redirect('/sellerproducts');
      }
    });
  });
}
