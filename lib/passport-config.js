const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {

  passport.serializeUser((userName, done) => {
    done(null, "testsettestset");
  });

  passport.deserializeUser((done) =>  {
    done(null);
  });

  passport.use(new FacebookStrategy({
    // 이 부분을 여러분 Facebook App의 정보로 수정해야 합니다.
    clientID: '780884495794248',
    clientSecret: 'f39f5ac048e4e93325611fa396d8ff8c',
    callbackURL : 'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: true,
    profileFields : ['email', 'name', 'picture']
  }, async (token, refreshToken, profile, done) => {
      console.log('Facebook', profile); // profile 정보로 뭐가 넘어오나 보자.
      var user = profile.name
      return done(null, user);
  }));
  
  // passport.use(new FacebookStrategy({
  //   // 이 부분을 여러분 Facebook App의 정보로 수정해야 합니다.
  //   clientID: '780884495794248',
  //   clientSecret: 'f39f5ac048e4e93325611fa396d8ff8c',
  //   profileFields : ['email', 'name', 'picture']
  // }, async (token, refreshToken, profile, done) => {
  //     console.log('Facebook', profile); // profile 정보로 뭐가 넘어오나 보자.
  //     var user = profile.name
  //     return done(null, user);
  // })); 
};
