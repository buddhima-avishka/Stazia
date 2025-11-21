import express from "express";
import { addHotel, allRooms, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/hotelController.js";

const adminRouter = express.Router();

// Accept main image + 4 room images (5 total files)
adminRouter.post(
  "/add-hotel",
  authAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "roomImage0", maxCount: 1 },
    { name: "roomImage1", maxCount: 1 },
    { name: "roomImage2", maxCount: 1 },
    { name: "roomImage3", maxCount: 1 },
  ]),
  addHotel
);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-rooms", authAdmin, allRooms);
adminRouter.post("/change-availability", authAdmin, changeAvailability);

export default adminRouter;
