const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const { connectMongoose } = require("./config/database.js");
const cors = require("cors");


connectMongoose();
const app = express();

const routes = require("./routes/userRoute");
const secureRoute = require("./routes/secure-routes");

app.use(cors({
  origin: ['https://tummoc-assignment.vercel.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(passport.initialize());
require("./middleware/passport.middleware.js");

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Welcome to Tummoc")
});

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(8080, () => {
  console.log("Server started.");
});
