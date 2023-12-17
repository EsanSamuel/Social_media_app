import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    //connecting the app to the database
    await mongoose
      .connect(process.env.MONGODB_URI!)
      .then(() => console.log("Database connected!"));
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
