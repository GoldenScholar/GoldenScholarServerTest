var authController = require('..\\controllers\\authcontroller.js');
 
 
module.exports = function(app, passport) {
 
    app.get('/signupstu', authController.signupstu);
 
	app.get('/signupfac', authController.signupfac);
 
    app.get('/signinstu', authController.signinstu);
	
	app.get('/signinfac', authController.signinfac);
	
	app.get('/invalidPage', authController.invalidPage);
 
	app.get('/dashboard',isLoggedIn, authController.dashboard);
	
	app.get('/logout',authController.logout);
 
    app.post('/signupstu', passport.authenticate('local-stu-signup', {
            successRedirect: '/signinstu',
 
            failureRedirect: '/signupstu'
        }
 
    ));
	
	app.post('/signinstu', passport.authenticate('local-stu-signin', {
			successRedirect: '/dashboard',
 
			failureRedirect: '/signinstu'
		}
 
	));
	
	app.post('/signinfac', passport.authenticate('local-stu-signin', {
			successRedirect: '/dashboard',
 
			failureRedirect: '/signinfac'
		}
 
	));
 
	function isLoggedIn(req, res, next) {
 
		if (req.isAuthenticated())
     
			return next();
         
		res.redirect('/invalidPage');
 
	}
 
}