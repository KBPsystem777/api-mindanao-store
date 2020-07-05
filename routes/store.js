const express = require("express");
const router = express.Router();
const shortid = require("shortid");

let Store = require("../models/storeModel");

// Route to register a store
router.route("/add").post((req, res) => {
  const _id = `s-${shortid.generate()}`;
  const active = true;
  const store_name = req.body.store_name;
  const store_email = req.body.store_email;
  const mobile = req.body.mobile;
  const store_address = req.body.address;
  const store_owner = req.body.owner;
  const store_owner_email = req.body.owner_email;

  // Route to create Store
  const newStore = new Store({
    _id,
    active,
    store_name,
    store_email,
    mobile,
    store_address,
    store_owner,
    store_owner_email,
  });

  newStore
    .save()
    .then(() => {
      res.json({
        success: true,
        message: "Store Created!",
        data: newStore,
        time: new Date(),
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: `Error: ${err}`,
      });
    });
});

// Route to get all Stores
router.route("/").get((req, res) => {
  Store.find()
    .then((stores) =>
      res.json({
        success: true,
        time: new Date(),
        stores: stores,
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

// Route to get a specific Store
router.route("/:id").get((req, res) => {
  Store.findById(req.params.id)
    .then((store) => {
      res.json({
        success: true,
        time: new Date(),
        store: store,
      });
    })
    .catch((err) =>
      res.json({
        success: false,
        message: `Error: ${err}`,
      })
    );
});

// Route to update a specific Store
router.route("/edit/:id").put((req, res) => {
  Store.findByIdAndUpdate(req.params.id).then((store) => {
    store.mobile = req.body.mobile;
    store.store_address = req.body.address;
    store
      .save()
      .then(() => {
        res.json({
          success: true,
          message: "Store Updated!",
          time: new Date(),
          store: store,
        });
      })
      .catch((err) =>
        res.json({
          success: false,
          message: `Error: ${err}`,
        })
      );
  });
});

// Router to delete a Store
// Not really deleting the store but turning them OFF
router.route("/delete/:id").put((req, res) => {
  Store.findByIdAndUpdate(req.params.id).then((store) => {
    store.active = false;
    store.save().then(() => {
      res.json({
        success: true,
        time: new Date(),
        message: `Store ${req.params.id} has been deleted!`,
      });
    });
  });
});
module.exports = router;
