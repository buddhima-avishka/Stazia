import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import bookingModel from "../models/bookingModel.js";
import hotelModel from "../models/hotelModel.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;

    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data is Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // Upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to make booking
const bookAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const { hotelId, slotDate, checkInDate, checkOutDate, numberOfGuests } =
      req.body;

    // Validate required fields
    if (!hotelId || !slotDate || !checkInDate || !checkOutDate) {
      return res.json({ success: false, message: "Missing booking details" });
    }

    // Get hotel data
    const hotelData = await hotelModel.findById(hotelId).select("-password");
    if (!hotelData) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    // Check if hotel is available
    if (!hotelData.available) {
      return res.json({ success: false, message: "Hotel is not available" });
    }

    // Get user data
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Calculate number of nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (numberOfNights < 1) {
      return res.json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Calculate total price
    const totalPrice = numberOfNights * hotelData.pricePerNight;

    // Get or initialize slots_booked
    let slots_booked = hotelData.slots_booked || {};

    // Check if this user already has a booking for this specific hotel on this date
    if (slots_booked[slotDate]) {
      const existingBooking = slots_booked[slotDate].find(
        (slot) => slot.userId.toString() === userId.toString()
      );

      if (existingBooking) {
        return res.json({
          success: false,
          message: "You already have a booking for this hotel on this date",
        });
      }
    } else {
      slots_booked[slotDate] = [];
    }

    // Add the time slot
    slots_booked[slotDate].push({
      userId,
      checkInDate,
      checkOutDate,
      booked: true,
    });

    // Update hotel with booked slots
    await hotelModel.findByIdAndUpdate(hotelId, { slots_booked });

    // Create booking data
    const bookingData = {
      userId,
      hotelId,
      slotDate,
      userData: JSON.stringify(userData),
      hotelData: JSON.stringify(hotelData),
      roomType: hotelData.roomType,
      checkInDate,
      checkOutDate,
      numberOfNights,
      numberOfGuests: numberOfGuests || 1,
      pricePerNight: hotelData.pricePerNight,
      totalPrice,
      cancelled: false,
      payment: false,
      isCompleted: false,
    };

    // Save booking
    const newBooking = new bookingModel(bookingData);
    await newBooking.save();

    res.json({
      success: true,
      message: "Booking created successfully",
      bookingId: newBooking._id,
      totalPrice,
      numberOfNights,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user bookings for frontend MyBookings page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req;

    // Get all bookings for this user, sorted by most recent first
    const bookings = await bookingModel
      .find({ userId })
      .sort({ createdAt: -1 });

    if (!bookings) {
      return res.json({ success: false, message: "No bookings found" });
    }

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel booking
const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.json({ success: false, message: "Booking ID is required" });
    }

    // Find the booking
    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    // Verify booking belongs to user
    if (booking.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    // Check if already cancelled
    if (booking.cancelled) {
      return res.json({ success: false, message: "Booking already cancelled" });
    }

    // Update booking status
    await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

    // Release the slot in hotel
    const hotelData = await hotelModel.findById(booking.hotelId);
    if (hotelData) {
      let slots_booked = hotelData.slots_booked;
      if (slots_booked[booking.slotDate]) {
        slots_booked[booking.slotDate] = slots_booked[booking.slotDate].filter(
          (slot) => slot.userId.toString() !== userId
        );
        await hotelModel.findByIdAndUpdate(booking.hotelId, { slots_booked });
      }
    }

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to make payment of appoinment using payhere
const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const { userId } = req;

    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    if (booking.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    if (booking.payment) {
      return res.json({ success: false, message: "Booking already paid" });
    }

    if (booking.cancelled) {
      return res.json({
        success: false,
        message: "Cannot pay for cancelled booking",
      });
    }

    const userData = JSON.parse(booking.userData);
    const hotelData = JSON.parse(booking.hotelData);

    // Return payment details for frontend to process
    const paymentDetails = {
      bookingId: booking._id,
      amount: booking.totalPrice,
      hotelName: hotelData.name,
      customerName: userData.name,
      customerEmail: userData.email,
    };

    res.json({ success: true, paymentDetails });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to complete payment (test mode)
const completePayment = async (req, res) => {
  try {
    const { bookingId, paymentStatus } = req.body;
    const { userId } = req;

    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    if (booking.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    if (paymentStatus === "success") {
      await bookingModel.findByIdAndUpdate(bookingId, {
        payment: true,
      });
      res.json({ success: true, message: "Payment completed successfully" });
    } else {
      res.json({ success: false, message: "Payment failed or cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  initiatePayment,
  completePayment,
};
