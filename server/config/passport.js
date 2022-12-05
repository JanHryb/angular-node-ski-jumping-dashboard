const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "email or password incorrect" });
        }
        if (!user.verified) {
          return done(null, false, {
            message: "please verify your email",
          });
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            throw new Error("bcrypt error");
          }
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "email or password incorrect",
            });
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  return done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});
