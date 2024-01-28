import { NextRequest } from "next/server";
import connectDB from "../../../../libs/connect";
import User from "../../../../models/user";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
   api_key: process.env.CLOUDINARY_API_KEY, 
   api_secret: process.env.CLOUDINARY_API_SECRET, 
 });

interface Params {
  params: {
    id: string;
  };
}

export const POST = async (request: NextRequest, { params }: Params) => {
  const { bio ,coverImage } = await request.json();
const ImageUrl = await cloudinary.uploader.upload(coverImage)
  try {
    await connectDB();
    const user = await User.findById(params.id);
    if (!user) {
      return new Response("User not found!", { status: 404});
    }
    user.bio = bio;
    user.coverImage = ImageUrl.url
    await user.save()
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
