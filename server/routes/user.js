import express from "express";
import Booking from "../models/booking.js";
import User from "../models/user.js";
import Listing from "../models/listing.js";

const router = express.Router();

/* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(trips);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find trips!", error: err.message });
  }
});

// add listing to wish

router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        success: true,
        message: "Listing is removed from wish list",
        data: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        success: true,
        message: "Listing is added to wish list",
        data: user.wishList,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Can not find trips!",
      error: error.message,
    });
  }
});

// properties GET
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;

    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(properties);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Can not find properties!", error: error.message });
  }
});

// reservation GET
router.get("/:userId/reservation", async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(reservations);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Can not find reservation!", error: error.message });
  }
});

export default router;
