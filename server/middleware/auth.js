const { StatusCodes } = require("http-status-codes");

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json("please log in to view that resource");
  }
};

module.exports = { requireAuth };
