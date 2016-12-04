var commonserver = require('./commonserver');
module.exports = function(app) {


//spl case for when user puts /login in the web url
    app.get('/category',  function(request, response) {
		//console.log('n');
            response.render('category.html', { 
	    	//for pagination
	    	user: request.user,
	        tagline: commonserver.getTagLine(request.user),
	        nextPage: "#",
	        searchtext: "",
	        tags: commonserver.getTags(),
			
	  		message: request.flash('error while loading data') 
	  	});
        });
		}
