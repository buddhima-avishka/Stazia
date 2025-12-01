import express from "express";
import {
  roomList,
  loginHotel,
  hotelProfile,
  updateHotelProfile,
  hotelBookings,
} from "../controllers/hotelController.js";
import upload from "../middlewares/multer.js";

const roomRouter = express.Router();

roomRouter.get("/list", roomList);
roomRouter.post("/login", loginHotel);
roomRouter.post("/profile", hotelProfile);
roomRouter.post(
  "/update-profile",
  upload.fields([{ name: "roomImages", maxCount: 10 }]),
  updateHotelProfile
);
roomRouter.post("/bookings", hotelBookings);

export default roomRouter;
