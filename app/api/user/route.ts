import User from "../../../models/user";
import connectDB from "../../../libs/connect";

export const dynamic = "force-dynamic"

export const GET = async (request: Request) => {
  try {
    connectDB();
    const getUsers = await User.find({});
    return new Response(JSON.stringify(getUsers), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Users not found!", { status: 404 });
  }
};
