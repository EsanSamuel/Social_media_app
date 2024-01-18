import { NextRequest } from "next/server";
import connectDB from "../../../../libs/connect";
import Post from "../../../../models/post";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

const validationSchema = z.object({
  userId: z.string().min(5),
  post: z.string().min(1).max(50),
  image: z.string(),
});

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
  const validate = validationSchema.parse(await request.json());
  const { userId, post, image }: PostData = validate;
  try {
    await connectDB();

    const ImageUrl = await cloudinary.uploader.upload(image);

    const newPosts = new Post({
      poster: userId,
      post,
      image: ImageUrl.url,
    });

    console.log(newPosts)

    await newPosts.save();

    return new Response(JSON.stringify(newPosts), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Post not created!", { status: 500 });
  }
};
