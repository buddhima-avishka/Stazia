import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected Successfully")
    );
    
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'stazia',
      serverSelectionTimeoutMS: 5000
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    console.warn("⚠️  Server will continue running. Please whitelist your IP in MongoDB Atlas.");
    // Don't exit - let server continue running
  }
};

export default connectDB;
