require("dotenv").config();
require("./config/databaseConnect");
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      dbName: "test",
    }),
  })
);
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.authenticate("session"));
require("./config/passport");

// routes
app.use("/user", require("./routes/user"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
