import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import hotelModel from "../models/hotelModel.js";
import jwt from "jsonwebtoken";

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

export { addHotel, loginAdmin };
