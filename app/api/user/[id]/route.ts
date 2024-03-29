import User from "../../../../models/user";
import connectDB from "../../../../libs/connect";
import { v2 as cloudinary } from "cloudinary";
import { z } from 'zod'

interface Params {
  id: string;
}

interface PostData {
  username: string;
  image: string;
}

const validateUser = z.object({
  username:z.string().min(1),
  image:z.string().min(1)
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
  const validate = validateUser.parse(await request.json())
  const { username, image }: PostData = validate;
  try {
    connectDB();
    const ImageUrl = await cloudinary.uploader.upload(image);
    const updateUser = await User.findById(params.id);

    if (!updateUser) {
      return new Response("Users not found!", { status: 404 });
    }

    updateUser.username = username;
    updateUser.image = ImageUrl.url;

    await updateUser.save();
    return new Response(JSON.stringify(updateUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Users not found!", { status: 404 });
  }
};
