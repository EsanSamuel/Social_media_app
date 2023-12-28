import Post from "../../../../models/post";
import connectDB from "../../../../libs/connect";

interface Params {
  id: string;
}

export const POST = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    await connectDB();
    const posts = await Post.findById(params.id);

    if (!posts) {
      return new Response("posts not found!", { status: 404 });
    }

    posts.likes += 1;
    await posts.save();
    return new Response("Post liked successfully!", { status: 201 });
  } catch (error) {
    return new Response("something went wrong!", { status: 404 });
  }
};
