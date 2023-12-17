import User from "../../../../models/user";
import connectDB from "../../../../libs/connect";
import { v2 as cloudinary } from "cloudinary";

interface Params {
  id: string;
}

interface PostData {
  username: string;
  image: string;
}

cloudinary.config({
  cloud_name: "dirm0bwdw",
  api_key: "244737511899697",
  api_secret: "LBf0Bay00WC4w1bonkdeapChUO4",
});

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    connectDB();
    const getUser = await User.findById(params.id);
    return new Response(JSON.stringify(getUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Users not found!", { status: 404 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  const { username, image }: PostData = await request.json();
  try {
    connectDB();
    const ImageUrl = await cloudinary.uploader.upload(image);
    const updateUser = await User.findById(params.id);

    updateUser.username = username;
    updateUser.image = ImageUrl.url;

    await updateUser.save();
    return new Response(JSON.stringify(updateUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Users not found!", { status: 404 });
  }
};
