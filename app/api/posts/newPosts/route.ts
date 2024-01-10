import { NextRequest } from "next/server";
import connectDB from "../../../../libs/connect";
import Post from "../../../../models/post";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface PostData {
  userId: string;
  post: string;
  image: string;
}

export const POST = async (request: NextRequest) => {
  const { userId, post, image }: PostData = await request.json();
  try {
    await connectDB();

    const ImageUrl = await cloudinary.uploader.upload(image);

    const newPosts = new Post({
      poster: userId,
      post,
      image: ImageUrl.url,
    });

    await newPosts.save();

    return new Response(JSON.stringify(newPosts), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Post not created!", { status: 500 });
  }
};
