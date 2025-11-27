import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import hotelModel from "../models/hotelModel.js";
import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// API for adding hotels
const addHotel = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      roomType,
      property,
      amenities,
      about,
      pricePerNight,
      address,
      location,
      rating,
      map,
    } = req.body;

    // Handle multiple files from multer
    const imageFile = req.files?.image?.[0];
    const roomImage0 = req.files?.roomImage0?.[0];
    const roomImage1 = req.files?.roomImage1?.[0];
    const roomImage2 = req.files?.roomImage2?.[0];
    const roomImage3 = req.files?.roomImage3?.[0];

    // checking for all data to add hotel
    if (
      !name ||
      !email ||
      !password ||
      !roomType ||
      !property ||
      !amenities ||
      !about ||
      !pricePerNight ||
      !address ||
      !location ||
      !rating ||
      !imageFile
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // validating password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // parsing and validating address JSON
    let parsedAddress;
    try {
      parsedAddress =
        typeof address === "string" ? JSON.parse(address) : address;
    } catch (jsonError) {
      return res.json({
        success: false,
        message:
          'Invalid address format. Please provide valid JSON like: {"street":"123 Main St","city":"New York","state":"NY","zipCode":"10001"}',
      });
    }

    // parsing amenities JSON
    let parsedAmenities;
    try {
      parsedAmenities =
        typeof amenities === "string" ? JSON.parse(amenities) : amenities;
    } catch (jsonError) {
      parsedAmenities = [];
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // uploading main image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Upload room images to cloudinary
    const roomImageUrls = [];
    const roomImageFiles = [roomImage0, roomImage1, roomImage2, roomImage3];

    for (const roomImg of roomImageFiles) {
      if (roomImg) {
        try {
          const upload = await cloudinary.uploader.upload(roomImg.path, {
            resource_type: "image",
          });
          roomImageUrls.push(upload.secure_url);
        } catch (uploadError) {
          console.log("Room image upload failed:", uploadError);
        }
      }
    }

    const hotelData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      roomType,
      property,
      amenities: parsedAmenities.join(", "), // Convert array to comma-separated string
      about,
      available: true,
      pricePerNight: Number(pricePerNight),
      address: parsedAddress,
      location,
      rating: Number(rating),
      map: map || "",
      date: Date.now(),
      slots_booked: {},
    };

    // Add room images if any were uploaded
    if (roomImageUrls.length > 0) {
      hotelData.roomImages = roomImageUrls;
    }

    const newHotel = new hotelModel(hotelData);
    await newHotel.save();

    res.json({ success: true, message: "Hotel added successfully" });
  } catch (error) {
    console.log(error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.json({
        success: false,
        message:
          "A hotel with this email already exists. Please use a different email.",
      });
    }

    res.json({ success: false, message: error.message });
  }
};

// API for admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms list for admin panel
const allRooms = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: false,
        message:
          "Database not connected. Please whitelist your IP in MongoDB Atlas and restart the server.",
      });
    }

    const rooms = await hotelModel.find({}).select("-password");
    res.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all bookings list for admin panel
const allBookings = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: false,
        message:
          "Database not connected. Please whitelist your IP in MongoDB Atlas and restart the server.",
      });
    }

    // Get all bookings sorted by creation date (newest first)
    const bookings = await bookingModel.find({}).sort({ createdAt: -1 }).lean();

    // Parse the userData and hotelData JSON strings for each booking
    const formattedBookings = bookings.map((booking) => {
      try {
        return {
          ...booking,
          userData: JSON.parse(booking.userData),
          hotelData: JSON.parse(booking.hotelData),
        };
      } catch (error) {
        console.log("Error parsing booking data:", error);
        return booking;
      }
    });

    res.json({
      success: true,
      bookings: formattedBookings,
      count: formattedBookings.length,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for admin
const cancelAppointment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: false,
        message: "Database not connected.",
      });
    }

    // Find the booking
    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    // Check if already cancelled
    if (booking.cancelled) {
      return res.json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // Update booking to cancelled
    await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

    // Get the hotel to update slots - remove the booked slot
    const slotDate = booking.slotDate;
    await hotelModel.findByIdAndUpdate(booking.hotelId, {
      $unset: { [`slots_booked.${slotDate}`]: "" },
    });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel
const dashboardData = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: false,
        message: "Database not connected.",
      });
    }

    // Get counts
    const roomsCount = await hotelModel.countDocuments();
    const bookingsCount = await bookingModel.countDocuments();
    const customersCount = await userModel.countDocuments();

    // Get latest 5 bookings with parsed data
    const latestBookings = await bookingModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Parse the userData and hotelData JSON strings
    const formattedLatestBookings = latestBookings.map((booking) => {
      try {
        return {
          ...booking,
          userData: JSON.parse(booking.userData),
          hotelData: JSON.parse(booking.hotelData),
        };
      } catch (error) {
        console.log("Error parsing booking data:", error);
        return booking;
      }
    });

    // Calculate revenue (only paid and not cancelled bookings)
    const paidBookings = await bookingModel.find({
      payment: true,
      cancelled: false,
    });

    const totalRevenue = paidBookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      data: {
        roomsCount,
        bookingsCount,
        customersCount,
        totalRevenue,
        latestBookings: formattedLatestBookings,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addHotel,
  loginAdmin,
  allRooms,
  allBookings,
  cancelAppointment,
  dashboardData,
};
