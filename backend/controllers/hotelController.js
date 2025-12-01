import hotelModel from "../models/hotelModel.js";
import bookingModel from "../models/bookingModel.js";
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

// API to get hotel profile
const hotelProfile = async (req, res) => {
  try {
    const { hotelId } = req.body;

    const hotelData = await hotelModel.findById(hotelId).select("-password");

    if (!hotelData) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    res.json({ success: true, hotelData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update hotel profile
const updateHotelProfile = async (req, res) => {
  try {
    const {
      hotelId,
      name,
      email,
      location,
      pricePerNight,
      about,
      roomType,
      property,
      rating,
      address,
      amenities,
    } = req.body;

    if (!hotelId) {
      return res.json({ success: false, message: "Hotel ID is required" });
    }

    // Find hotel
    const hotel = await hotelModel.findById(hotelId);

    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    // Update fields
    if (name) hotel.name = name;
    if (email) hotel.email = email;
    if (location) hotel.location = location;
    if (pricePerNight) hotel.pricePerNight = pricePerNight;
    if (about) hotel.about = about;
    if (roomType) hotel.roomType = roomType;
    if (property) hotel.property = property;
    if (rating) hotel.rating = rating;

    // Handle address (parse if it's a JSON string)
    if (address) {
      hotel.address =
        typeof address === "string" ? JSON.parse(address) : address;
    }

    // Handle amenities (parse if it's a JSON string and convert to JSON string for storage)
    if (amenities !== undefined) {
      const parsedAmenities =
        typeof amenities === "string" ? JSON.parse(amenities) : amenities;
      hotel.amenities = Array.isArray(parsedAmenities)
        ? JSON.stringify(parsedAmenities)
        : amenities;
    }

    // Handle room images upload - REPLACE existing images with new ones
    if (req.files && req.files.roomImages && req.files.roomImages.length > 0) {
      const uploadedImages = [];

      for (const file of req.files.roomImages) {
        try {
          const imageUpload = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          uploadedImages.push(imageUpload.secure_url);
        } catch (uploadError) {
          console.log("Error uploading image:", uploadError);
        }
      }

      // Replace old images with new images
      if (uploadedImages.length > 0) {
        hotel.roomImages = uploadedImages;
      }
    }

    await hotel.save();

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all bookings for a specific hotel
const hotelBookings = async (req, res) => {
  try {
    const { hotelId } = req.body;

    if (!hotelId) {
      return res.json({ success: false, message: "Hotel ID is required" });
    }

    // Get all bookings for this hotel, sorted by creation date (newest first)
    const bookings = await bookingModel
      .find({ hotelId })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  roomList,
  loginHotel,
  hotelProfile,
  updateHotelProfile,
  hotelBookings,
};
