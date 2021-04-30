// init
import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: "https://www.google.com/m8/feeds" })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/lolxdhaha" }),
  function (req, res) {
    res.redirect("/");
  }
);

export default router;
