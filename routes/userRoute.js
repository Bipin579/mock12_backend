const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post(
  "/signup",
  (req, res, next) => {
    passport.authenticate("signup", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      res.json({
        message: "Signup successful",
        user: user,
      });
    })(req, res, next);
  }
);


router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});




module.exports = router;
