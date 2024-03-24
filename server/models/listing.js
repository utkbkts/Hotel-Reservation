import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    guest: {
      type: Number,
      required: true,
    },
    BedRooms: {
      type: Number,
      required: true,
    },
    Beds: {
      type: Number,
      required: true,
    },
    BathRooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default: [],
    },
    listingPhotoPath: [{ type: String }],
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    highlight: {
      required: true,
      type: String,
    },
    highlightDesc: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;
// module.exports = User;
