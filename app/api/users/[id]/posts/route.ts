import connectDB from "../../../../../libs/connect";
import Post from "../../../../../models/post";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDB();
    const getUserPosts = await Post.find({ poster: params.id }).populate(
      "poster"
    );

    return new Response(JSON.stringify(getUserPosts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 404 });
  }
};
