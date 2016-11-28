var Comment = require('../models/comment');

module.exports = function(app) {
	app.post('/addComment', function(req, res) {
    console.log(req.body);
		 var newComment = new Comment();
     newComment.comment.productID = req.body.productID;
     newComment.comment.userEmail = req.body.comment_email;
     newComment.comment.username = req.body.comment_username;
     newComment.comment.text = req.body.comment_text;
     newComment.comment.title = req.body.comment_title;
     var str1 = "/productSpecs?productID=";
     var str2 = req.body.productID;
     var redirectTo = str1.concat(str2);
     console.log(res);
     newComment.save(function(err) {
        if (!err)
        {
           res.redirect(redirectTo);
                       
        }
        else
        {
            res.render(redirectTo);
            message: request.flash('Error in adding Comment');
        }           
 });

	});

}
