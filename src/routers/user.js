const express = require("express");
const router = new express.Router();
const User = require("../models/users");
const auth = require("../middlewares/auth");
const multer = require("multer");
const sharp = require("sharp");
const {
  sendOtpToMail,
} = require("../emails/account");


//register/create user
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    if (e.keyPattern.email) res.status(401).send("Email already exist");
    res.status(400).send(e);
  }
});

//login with email/pwd to get otp
router.post("/login", async (req, res) => {
  try {
    const user = await User.findBycredentials(
      req.body.email,
      req.body.password
    );
    //send otp
    const otp = sendOtpToMail(user.email, user.name);
    user.otp = otp;
    await user.save();
    res.status(201).send({ user, message: "Otp sent to your email-id" });
  } catch (err) {
    res.status(400).send();
  }
});

//login with otp
router.post("/otplogin", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      otp: req.body.otp,
    });
    if (!user) throw new Error("Invalid credentials");
    const token = await user.generateToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send("Error");
  }
});

//logout from all devices
router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
