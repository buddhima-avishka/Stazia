import hotelModel from "../models/hotelModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const changeAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const roomData = await hotelModel.findById(roomId);
    await hotelModel.findByIdAndUpdate(roomId, {
      available: !roomData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const roomList = async (req, res) => {
  try {
    const rooms = await hotelModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for hotel login
const loginHotel = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find hotel by email
    const hotel = await hotelModel.findOne({ email });

    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, hotel.password);

    if (isMatch) {
      // Generate JWT token
      const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { changeAvailability, roomList, loginHotel };
