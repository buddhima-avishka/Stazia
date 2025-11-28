import express from "express";
import { roomList, loginHotel } from "../controllers/hotelController.js";

const roomRouter = express.Router();

roomRouter.get("/list", roomList);
roomRouter.post("/login", loginHotel);

export default roomRouter;
