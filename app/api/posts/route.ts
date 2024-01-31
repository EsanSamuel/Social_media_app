import connectDB from "../../../libs/connect";
import Post from "../../../models/post";

export const dynamic = "force-dynamic"

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const Posts = await Post.find({}).populate("poster").sort({ createdAt: -1});

    return new Response(JSON.stringify(Posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Posts not found!", { status: 404 });
  }
};
