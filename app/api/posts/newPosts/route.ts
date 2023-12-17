import connectDB from "../../../../libs/connect";
import Post from "../../../../models/post";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dirm0bwdw",
  api_key: "244737511899697",
  api_secret: "LBf0Bay00WC4w1bonkdeapChUO4",
});

interface PostData {
  userId: string;
  post: string;
  image: string;
}

export const POST = async (request: Request) => {
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
