const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.send("Hi new");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({ error: "Please provide all data" });
  }
  User.findOne({ email: email })
    .then((isUserExist) => {
      if (isUserExist) {
        return res.status(422).json({ error: "User already exist" });
      }
      // creating an user object to story it in database
      const user = new User({
        name,
        email,
        password,
      });
      user
        .save()
        .then((user) => {
          res.json({ message: "User has been registered successfully.." });
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});
module.exports = router;
