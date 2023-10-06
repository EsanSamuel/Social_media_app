import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect('mongodb+srv://esansamuel555:sam111@cluster0.l2oitkc.mongodb.net/');
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;