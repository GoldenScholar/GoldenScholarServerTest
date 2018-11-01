//load bcrypt
  var bCrypt = require('bcrypt-nodejs');

  module.exports = function(passport, student, faculty){

  var Student = student;
  var Faculty = faculty;
  var LocalStrategy = require('passport-local').Strategy;


  passport.serializeUser(function(student, done) {
          done(null, student.id);
      });
	  
	passport.serializeUser(function(faculty, done) {
          done(null, faculty.id);
      });

  // used to deserialize the student
  passport.deserializeUser(function(id, done) {
      Student.findById(id).then(function(student) {
        if(student){
          done(null, student.get());
        }
        else{
          done(student.errors,null);
        }
      });

  });
  
  // used to deserialize the faculty
  passport.deserializeUser(function(id, done) {
      Faculty.findById(id).then(function(faculty) {
        if(faculty){
          done(null, faculty.get());
        }
        else{
          done(faculty.errors,null);
        }
      });

  });

//Faculty Signup
  passport.use('local-fac-signup', new LocalStrategy(

    {           
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){
       

      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       Student.findOne({where: {email:email}}).then(function(student){

      if(student)
      {
        return done(null, false, {message : 'That email is already taken'} );
      }

      else
      {
        var studentPassword = generateHash(password);
        var data =
        { email:email,
        password:studentPassword,
        studentname: req.body.studentname
        };


        Student.create(data).then(function(newStudent,created){
          if(!newStudent){
            return done(null,false);
          }

          if(newStudent){
            return done(null,newStudent);
            
          }


        });
      }


    }); 



  }



  ));
    
	passport.use('local-stu-signup', new LocalStrategy(

    {           
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){
       

      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       Student.findOne({where: {email:email}}).then(function(student){

      if(student)
      {
        return done(null, false, {message : 'That email is already taken'} );
      }

      else
      {
        var studentPassword = generateHash(password);
        var data =
        { email:email,
        password:studentPassword,
        studentname: req.body.studentname
        };


        Student.create(data).then(function(newStudent,created){
          if(!newStudent){
            return done(null,false);
          }

          if(newStudent){
            return done(null,newStudent);
            
          }


        });
      }


    }); 



  }



  ));
	
	
  //LOCAL SIGNIN
  passport.use('local-stu-signin', new LocalStrategy(
    
  {

  // by default, local strategy uses studentname and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var Student = student;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

    Student.findOne({ where : { email: email}}).then(function (student) {

      if (!student) {
        return done(null, false, { message: 'Email does not exist' });
      }

      if (!isValidPassword(student.password,password)) {

        return done(null, false, { message: 'Incorrect password.' });

      }

      var studentinfo = student.get();

      return done(null,studentinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message: 'Something went wrong with your Signin' });


    });

  }
  ));

}