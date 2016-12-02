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
  //var upload = multer({ storage : storage}).array('prodImages');
  var upload = multer({ storage : storage}).fields([{
           name: 'prodImagesLarge'
         }, {
           name: 'prodImagesThumbnail'
         }]);
  var gfs;
  conn.once('open', function() {
    gfs = Grid(conn.db);
    app.set('gridfs',gfs);
  });
   
	app.get('/addInventory', commonserver.anypageAuth, function(request, response) {
    Category.find({"category.level" : {$ne : 1}},{"category": 1, "category.name": 1},function(err, categories){
      //Category.find({},{},{'group': 'category.parentCategoryID'}, function(err, categories){
        response.render('addInventory.html', { 
  				user: request.user,
  				categories: categories,
          tagline: commonserver.getTagLine(request.user),
          nextPage:"#",
          searchtext: "",
          tags:commonserver.getTags(),
  				message: request.flash('*Error in adding inventory') 
      });
    });
	});

  app.post('/addInventory', upload, function (req, res) {
    Product.findOne({$and: [{'product.name' : req.body.product_name}, {'product.sellerID' : req.user.user.email}]}, function(err, product) {
      var newProduct = new Product();
      if (err) { console.log('error'); return done(err);}
      if (product) {
        Category.find({"category.level" : {$ne : 1}},{"category": 1, "category.name": 1}, function(err, categories){
          res.render('addInventory.html', { 
            user: req.user,
            categories: categories,
            tagline: commonserver.getTagLine(req.user),
            nextPage:"#",
            tags:commonserver.getTags(),
            searchtext: "",
            message: '*Product with the same name already exists in your inventory. Please add a product with another name.',
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
