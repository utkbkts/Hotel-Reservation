import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotnev from "dotenv";
import authRoutes from "./routes/auth.js";
import listeningRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";

const app = express();

dotnev.config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/auth", authRoutes);
app.use("/properties", listeningRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

//mongoose
const PORT = 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server Port ${PORT}`)))
  .catch((err) => console.log(`${err} did root connect`));
