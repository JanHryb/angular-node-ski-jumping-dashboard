const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { StatusCodes } = require("http-status-codes");
const { requireAuth } = require("../middleware/auth");

router.get("", requireAuth, (req, res) => {
  const user = req.user;
  return res.status(StatusCodes.OK).json(user);
});

router.post("/register", async (req, res) => {
  const { username, email, password, passwordRepeat } = req.body;
  let validForm = true;
  let errorMessages = {
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  if (username.length < 3) {
    errorMessages.username = "this field must be at least 3 characters";
    validForm = false;
  }
  if (username.indexOf(" ") >= 0) {
    errorMessages.username = "username can't contain space";
    validForm = false;
  }
  if (email.indexOf(" ") >= 0) {
    errorMessages.email = "email can't contain space";
    validForm = false;
  }
  if (password.length < 6) {
    errorMessages.password = "this field must be at least 6 characters";
    validForm = false;
  }
  if (password !== passwordRepeat) {
    errorMessages.passwordRepeat = "passwords aren't equal";
    validForm = false;
  }

  if (validForm) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        errorMessages.email = "email is already registered";
        return res.status(StatusCodes.BAD_REQUEST).json(errorMessages);
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          throw new Error("bcrypt error");
        }
        const user = await User.create({
          username,
          email,
          password: hash,
        });
        return res.status(StatusCodes.CREATED).json("account has been created");
      });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(errorMessages);
  }
});

router.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  (req, res) => {
    const { rememberMe } = req.body;
    if (rememberMe) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7; //cookie expires after 7 days
    } else {
      req.session.cookie.maxAge = null; // cookie expires at end of session
    }
    req.flash("greeting", "hello world");
    return res.status(StatusCodes.OK).json("successfull login");
  }
);

module.exports = router;
