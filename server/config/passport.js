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
          return done(null, false, {
            message: "email or password is incorrect",
          });
        }
        if (!user.verified) {
          return done(null, false, {
            message: "your email is not verified",
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
              message: "email or password is incorrect",
            });
          }
        });
      } catch (err) {
        return done(err, false, { message: "internal server error" });
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
