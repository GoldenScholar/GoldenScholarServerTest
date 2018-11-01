var exports = module.exports = {}
 
exports.signupstu = function(req, res) {
 
    res.render('registerStudent');
 
}

exports.signupfac = function(req, res) {
 
    res.render('registerFaculty');
 
}

exports.signinstu = function(req, res) {
 
    res.render('loginStudent');
 
}

exports.signinfac = function(req, res) {
 
    res.render('loginFaculty');
 
}

exports.invalidPage = function(req, res) {
 
    res.render('invalidPage');
 
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/invalidPage');
 
    });
 
}