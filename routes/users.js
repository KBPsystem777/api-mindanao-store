const express = require("express");
const router = express.Router();
const shortid = require("shortid");

let User = require("../models/userModel");

router.route("/").get((req, res) => {
  User.find()
    .then((users) =>
      res.json({
        success: true,
        time: new Date(),
        users: users,
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        time: new Date(),
        error_message: err,
      })
    );
});

router.route("/add").post((req, res) => {
  const _id = `u-${shortid.generate()}`;
  const username = req.body.username;
  const email = req.body.email;
  const name = req.body.name;
  const last_name = req.body.last_name;
  const address = req.body.address;

  const newUser = new User({
    _id,
    username,
    email,
    name,
    last_name,
    address,
  });

  newUser
    .save()
    .then(() =>
      res.json({
        success: true,
        message: "User Added!",
        newUser,
        time: new Date(),
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: `Error: ` + err,
        time: new Date(),
      })
    );
});

module.exports = router;
