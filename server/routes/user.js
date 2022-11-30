const router = require("express").Router();
const statusCodes = require("http-status-codes").StatusCodes;

router.get("/", (req, res) => {
  return res.status(statusCodes.OK).json({ user: "jano" });
});

module.exports = router;
