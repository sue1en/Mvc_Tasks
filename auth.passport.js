const jwt = require("jsonwebtoken");
const HashSecret = process.env.JWT_SECRET;
const { users } = require("./models");
const userService = require("./services/user.service");

const passport = require("passport")
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy   = passportJWT.Strategy;

module.exports = function (passport){
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.use(new LocalStrategy({
      usernameField: "email",
      passwordField:"password"
    },
    async function (email, password, done){
      try{
        const user = await users.findOne({email})
        
        if(!user){
          return done(null, false, {message:"Usuário não encontrado."});
        }
        const usermap = user.dataValues
        console.log("#####__AQUI__#######", usermap)
        const validateUser = await userService.userValidate(email, password)
        console.log("#####__AQUI__#######", validateUser)
        if(!validateUser){
          return done(null, false, {message:"Usuário ou senha inválidos"});
        }
        return done(null, user);
      } catch(error) {
        return done(error, false);
      }
    }));

}

passport.use(new JWTStrategy({
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:HashSecret
  },
  function(jwtPayload, done){
    return users.findOne(jwtPayload.id).then(user => {
      return done(null, user);
    }).catch(error => {
      return done(error);
    });
  }
));