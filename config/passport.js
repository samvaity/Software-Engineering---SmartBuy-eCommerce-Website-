// local authentication
var LocalStrategy    = require('passport-local').Strategy;

// Facebook authentication
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = "1099430550177800"
var FACEBOOK_APP_SECRET = "114ef61da3f4cd19ec247feb4a2ffad9";
 
// Google authentication
var GOOGLE_CONSUMER_KEY = "24058135543-3dp6b2i67vsmf01np7h1bn8rjoqiqq94.apps.googleusercontent.com";
var GOOGLE_CONSUMER_SECRET = "ZxHzOIr4sd6Nge284x5Zi-XD";
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy

var User = require('../models/user');

module.exports = function(passport) {

    // Maintaining persistent login sessions
    // serialized  authenticated user to the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialized when subsequent requests are made
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

     passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
       process.nextTick(function() {
            User.findOne({ 'user.email' :  email }, function(err, user) {
                if (err){ return done(err);}
                if (!user)
                    return done(null, false, req.flash('error', 'User does not exist.'));

                if (!user.verifyPassword(password))
                    return done(null, false, req.flash('error', 'Enter correct password'));
               else
                    return done(null, user);
            });
        });

    }));

     passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        console.log("In signup");
                        console.log(req.body);
        process.nextTick(function() {
       
            if (!req.user) {
                User.findOne({ 'user.email' :  email }, function(err, user) {
            	    if (err){ return done(err);}
                    if (user) {
                        return done(null, false, req.flash('signuperror', 'User already exists'));
                    } else {
                        var newUser            = new User();
			            newUser.user.username  = req.body.username;
                        newUser.user.email    = email;
                        newUser.user.password = newUser.generateHash(password);
                        newUser.user.role    = req.body.roles;
            
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            } else {
                    var user   = req.user;
		            user.user.username    = req.body.username;
                    user.user.email    = email;
                    user.user.password = user.generateHash(password);
			        user.user.role    =  req.body.roles;
                    user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });


    }));

// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Facebook
// profile), and invoke a callback with a user object.

/* one limitation here ideally fro OAuth you shouldnt update the passwword via reset password of this website*/
	passport.use(new FacebookStrategy({
    		clientID: FACEBOOK_APP_ID,
    		clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:8080/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
  		},


  		function(req, accessToken, refreshToken, profile, done) {
    		// asynchronous verification, for effect...
               console.log("In facebook")
    			process.nextTick(function () {
            			if (!req.user) {
                            console.log(profile.emails[0].value)
                          				User.findOne({ 'user.email' :  profile.emails[0].value }, function(err, user) {
                	    				if (err){ return done(err);}
                        				if (user) {
                                            console.log("mil gaya")
                            				return done(null, user);
                        				} else {
                            			var newUser = new User();
            							newUser.user.username    = profile.displayName;
                                    	newUser.user.email    = profile.emails[0].value;
                                        newUser.user.role    = "buyer";
            							newUser.save(function(err) {
                            					if (err)
                                					{
                                                         console.log("in db error")
                                                        throw err;}
                                                console.log("after db error")
                                                console.log(newUser)
                            				return done(null, newUser);
                        				});
                    				}

                			});
                         	} else {
					var user            = req.user;
					user.user.username    = profile.displayName;
                	user.user.email    = profile.emails[0].value;
					newUser.user.role    = "buyer";
                    		user.save(function(err) {
                    				if (err)
                        				throw err;
                    			return done(null, user);
                			});
            			}
    			});
  		}
	));

// Use the GoogleStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Google
// profile), and invoke a callback with a user object.
		passport.use(new GoogleStrategy({
    				clientID: GOOGLE_CONSUMER_KEY,
    				clientSecret: GOOGLE_CONSUMER_SECRET,
    				callbackURL: "http://localhost:8080/auth/google/callback"
  				},
  				function(req, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    					process.nextTick(function () {
      
     						if (!req.user) {
                                console.log("In google")
                                console.log( profile.emails[0].value)
 							    User.findOne({ 'user.email' :  profile.emails[0].value }, function(err, user) {
            	    						if (err){ return done(err);}
                    					if (user) {
                                            console.log("got user")
                        					return done(null, user);
                    					} else {
                                            console.log("New patil")
                        					var newUser            = new User();
								            newUser.user.username    = profile.displayName;
								            newUser.user.email    = profile.emails[0].value;
                                            newUser.user.role    = "buyer";
								            newUser.save(function(err) {
                            				if (err)
                                				{
                                                    console.log("Naya user save nahi ");
                                                            throw err;
                                                }
                            					return done(null, newUser);
                        					});
                    					}

                					});
                         			}
                                     else {
							var user  = req.user;
							user.user.username    = profile.displayName;
							user.user.email    = profile.emails[0].value;
                            newUser.user.role    = "buyer";
                					user.save(function(err) {
                    					if (err)
                        					{
                                                console.log("After save")
                                                throw err;
                                            }
                    					return done(null, user);
							});
						}
                			});

    			}
 
));

};
