/*var commonserver = require('./commonserver');
module.exports = function(app) {


//spl case for when user puts /login in the web url
    app.get('/',  function(request, response) {
		//console.log('n');
            response.render('webhome.html', { 
	    	//for pagination
	    	user: request.user,
	        tagline: commonserver.getTagLine(request.user),
	        nextPage: "#",
	        searchtext: "",
	        tags: commonserver.getTags(request.user),
	  		message: request.flash('error while loading data') 
	  	});
        });
		}
*/