import express from "express";
import { addHotel, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

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

export default adminRouter;
