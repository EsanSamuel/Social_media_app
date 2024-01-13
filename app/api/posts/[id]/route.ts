import Post from "../../../../models/post";
import connectDB from "../../../../libs/connect";
import { z } from 'zod'

const validatePost = z.object({
  post:z.string().min(1).max(50)
})

interface Params {
  id: string;
}

interface PostData {
  post: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDB();
    const posts = await Post.findById(params.id).populate("poster");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Posts not found", { status: 404 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    await connectDB();
    const deletePost = await Post.findByIdAndRemove(params.id);
    return new Response("Post deleted successfully!", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 404 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  const validate = validatePost.parse(await request.json())
  const { post }: PostData = validate;
  try {
    const updatedPosts = await Post.findById(params.id);

    if (!updatedPosts) {
      return new Response("Posts not found to be updated!", { status: 404 });
    }
    updatedPosts.post = post;

    await updatedPosts.save();
    return new Response(JSON.stringify(updatedPosts), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Posts not found", { status: 404 });
  }
};
