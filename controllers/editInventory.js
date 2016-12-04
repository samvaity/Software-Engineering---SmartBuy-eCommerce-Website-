var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var commonserver = require('./commonserver');
var newGrid = require('../models/fsfiles');

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
   
	app.get('/editInventory', commonserver.anypageAuth, function(request, response) {
    var product_id = request.param('productID');
    Category.find({"category.level" : {$ne : 1}},{"category": 1, "category.name": 1},function(err, categories){
      if (err){           // Error occured while fetching categories
        throw err;
      }
      else{
        var nextPage = "#";
        if(product_id != null){
          Product.findOne({"_id": mongoose.mongo.ObjectID(product_id)}, function(err, product){
            if (err){           // Error occured while fetching product
                throw err;
            }
            else if(product){              // No error in fetching product & a product is found
              newGrid.find({$and : [{"metadata.productname": product.product.name}, {"metadata.sellerID": product.product.sellerID}]}).lean().exec(function(err, files) {
                var thumbnailImages = [], largeImages = [];
                if(err){  // error occured while retrieving images
                  throw err;
                }
                else if(files){   //images retrieved successfully
                  files.forEach(function(file, index, filesArray){
                    if(file['metadata']['imagetype'] == "largeimage"){   // largeimages found
                        largeImages.push(file["filename"]);
                    }
                    else if(file['metadata']['imagetype'] == "thumbnailimage"){   // thumbnailimages found
                        thumbnailImages.push(file["filename"]);
                    }
                  });
                }
                response.render('editInventory.html', { 
                  user: request.user,
                  categories: categories,
                  tagline: commonserver.getTagLine(request.user),
                  nextPage: nextPage,
                  largeImages: largeImages,
                  thumbnailImages: thumbnailImages,
                  tags: commonserver.getTags(),
                  product: product, 
                  searchtext: "",
                  message: request.flash('error in adding inventory') 
                });
              });
            }
            else{       // No product found
              response.render('editInventory.html', { 
                user: request.user,
                categories: categories,
                tagline: commonserver.getTagLine(request.user),
                nextPage: nextPage,
                largeImages: [],
                thumbnailImages: [],
                tags: commonserver.getTags(),
                product: product, 
                searchtext: "",
                message: "*No product found",
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
