import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotel",
      required: true,
    },
    slotDate:{
      type: String,
      required: true,
    },
    userData: {
      type: String,
      required: true,
    },
    hotelData: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    numberOfNights: {
      type: Number,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      default: 1,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    cancelled: {
      type: Boolean,
      default: false
    },
    payment:{
      type: Boolean,
      default: false,
    },
    isCompleted:{
      type: Boolean,
      default: false,
    }
    // paymentStatus: {
    //   type: String,
    //   enum: ["pending", "paid", "failed", "refunded"],
    //   default: "pending",
    // },
    // bookingStatus: {
    //   type: String,
    //   enum: ["pending", "confirmed", "cancelled", "completed"],
    //   default: "pending",
    // },
    // specialRequests: {
    //   type: String,
    //   default: "",
    // },
    // cancelledAt: {
    //   type: Date,
    // },
    // confirmedAt: {
    //   type: Date,
    // },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// Index for faster queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ hotelId: 1, createdAt: -1 });
bookingSchema.index({ bookingStatus: 1 });

const bookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default bookingModel;
