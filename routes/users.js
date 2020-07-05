const express = require("express");
const router = express.Router();
const shortid = require("shortid");

let User = require("../models/userModel");

// Route to register a User
router.route("/add").post((req, res) => {
  const _id = `u-${shortid.generate()}`;
  const active = true;
  const username = req.body.username;
  const email = req.body.email;
  const name = req.body.name;
  const last_name = req.body.last_name;
  const address = req.body.address;

  const newUser = new User({
    _id,
    active,
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
      res.json({
        success: false,
        message: `Error: ` + err,
        time: new Date(),
      })
    );
});

// Route to get all Users
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

// Get User by ID#
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      res.json({
        success: true,
        data: user,
        time: new Date(),
      })
    )
    .catch((err) => res.status(400).res.json(new Date() + `Error: ${err}`));
});

// Route to edit User
router.route("/edit/:id").put((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
      user.name = req.body.name;
      user.address = req.body.address;
      user.save().then(() =>
        res.json({
          success: true,
          message: "User updated!",
          data: user,
          time: new Date(),
        })
      );
    })
    .catch((err) => res.status(400).json(new Date() + ` Error: ${err}`));
});

// Router to delete a User
// Not really deleting the user but turning them OFF
router.route("/delete/:id").put((req, res) => {
  User.findByIdAndUpdate(req.params.id).then((user) => {
    user.active = false;
    user.save().then(() =>
      res.json({
        success: true,
        time: new Date(),
        message: `User ${req.params.id} has been deleted!`,
      })
    );
  });
});

module.exports = router;
