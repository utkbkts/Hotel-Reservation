import express from "express";
import multer from "multer";
import listing from "../models/listing.js";
import User from "../models/user.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//create listing

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guest,
      BedRooms,
      Beds,
      BathRooms,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;
    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res
        .status(500)
        .json({ success: false, message: "No File Uploaded" });
    }
    const listingPhotoPath = listingPhotos.map((file) => file.path);
    const newListingData = new listing({
      creator,
      type,
      category,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guest,
      BedRooms,
      Beds,
      BathRooms,
      amenities,
      listingPhotoPath,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });
    await newListingData.save();
    return res.status(200).json({
      success: true,
      message: "Created is successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get listing

router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listining;
    if (qCategory) {
      listining = await listing
        .find({ category: qCategory })
        .populate("creator");
    } else {
      listining = await listing.find().populate("creator");
    }
    res.status(200).json(listining);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get details

router.get("/:listingId", async (req, res) => {
  const { listingId } = req.params;
  try {
    const listings = await listing.findById(listingId).populate("creator");
    res.status(202).json(listings);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Listing can not found!", error: error.message });
  }
});

//!search
router.get("/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    let listings = [];

    if (search === "all") {
      listings = await listing.find().populate("creator");
    } else {
      listings = await listing
        .find({
          $or: [
            { category: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
          ],
        })
        .populate("creator");
    }
    res.status(200).json(listings);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Listing can not found!", error: error.message });
  }
});

export default router;
