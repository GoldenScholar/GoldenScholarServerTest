var express = require('express');
var app = express();
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var server_port = process.env.OPENSHIFT_NODEJS_PORT
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

//Models
var models = require(__dirname +  "\\app\\models");
 
 //Routes
var authRoute = require(__dirname + '\\app\\routes\\auth.js')(app,passport);

//load passport strategies
require(__dirname +  '\\app\\config\\passport\\passport.js')(passport, models.student, models.faculty);
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

//For Handlebars
app.set('views', __dirname + '\\app\\views')
app.use(express.static(__dirname + '\\public'));
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function(req, res){
  res.render('loginHub.hbs', {
        title: 'loginHub',
    nav: ['loginHub', 'loginStudent', 'loginFaculty', 'registerStudent', 'registerFaculty', 'tempProfile']
  });
});

app.listen(server_port, server_ip_address, function(err) {
 
    if (!err)
        console.log( "Listening on " + server_ip_address + ", port " + server_port );
    else console.log(err)
 
});
