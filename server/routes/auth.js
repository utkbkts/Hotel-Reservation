import express from "express";
import bcrpyt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/user.js";

const router = express.Router();

//!multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
//user register
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body;

    const profileImage = req.file;

    if (!profileImage) {
      return res
        .status(400)
        .json({ message: "No file Uploads", success: false });
    }
    const profileImagePath = profileImage.path;
    console.log(profileImagePath);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "user already exists", success: false });
    }
    const salt = await bcrpyt.genSalt();
    const hashedPassword = await bcrpyt.hash(password, salt);
    if (password !== confirmpassword) {
      return res
        .status(409)
        .json({ message: "password is do not match", success: false });
    }
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      profileImagePath,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "registered Successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ success: false, message: "user is not found" });
    }
    const passwordCompara = bcrpyt.compare(password, user.password);
    //eşleşme
    if (!passwordCompara) {
      return res
        .status(409)
        .json({ success: false, message: "password wrong !!" });
    }
    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    return res.status(200).json({
      success: true,
      message: "Login Successfuly",
      token: token,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
