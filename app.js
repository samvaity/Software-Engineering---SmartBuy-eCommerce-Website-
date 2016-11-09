/*var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/login.html', function (req, res) {
  //console.log( process.cwd());
   res.sendFile( process.cwd() + "/public/views/" + "login.html" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   //console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})*/

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path'), fs = require('fs');
var http = require('http');
var server = http.createServer(app);
var Grid  = require('gridfs-stream');
var multer   = require('multer');
var bodyParser   = require('body-parser');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url); 

require('./config/passport')(passport); 

app.configure(function() {

   app.use(express.cookieParser());
   //app.use(express.bodyParser()); 
   app.use(bodyParser.urlencoded({ extended: false }))
   app.use(bodyParser.json());
   app.use(multer({ dest: './uploads/'}));
   app.use(express.static(path.join(__dirname, 'public')));
   app.use('/app', express.static(path.join(__dirname, 'app')));
   app.use('/views', express.static(path.join(__dirname, 'views')));
   app.set('views', __dirname + '/views');
   app.engine('html', require('ejs').renderFile);
   app.use(express.session({ secret: 'smartbuy' })); 
   /*app.use(express.bodyParser({uploadDir:'/images'}));*/
   app.use(passport.initialize());
   app.use(passport.session()); 
   app.use(flash()); 

});


require('./app/routes.js')(app, passport,server); 
require('./app/addInventory.js')(app, server, multer, mongoose, Grid, fs, configDB);
require('./app/sellerproducts.js')(app, server, multer, mongoose, Grid, fs, configDB);

server.listen(port);
console.log('Listening  to  port ' + port);


