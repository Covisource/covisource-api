var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

passport.use(
  new GoogleStrategy(
    {
      consumerKey: process.env.GOOGLE_CLIENT_ID,
      consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (token: any, tokenSecret: any, profile: any, done: any) {
      console.log(token);
      console.log(tokenSecret);
      console.log(profile);
      console.log(done);
    }
  )
);
