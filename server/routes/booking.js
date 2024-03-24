import express from "express";
import Booking from "../models/booking.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Created Successfully",
      data: newBooking,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});
export default router;
