import connectDB from "../../../../libs/connect";
import Post from "../../../../models/post";
import Like from "../../../../models/like";

interface Params {
  id: string;
}

interface ILike {
  userId: string;
}

const updateLikeCounts = async (postId: string) => {
  const posts = await Post.findById(postId);
  posts.likeCounts = await Like.countDocuments({ post: postId });
  await posts.save();

  return new Response(JSON.stringify(posts), { status: 201 });
};

export const POST = async (
  request: Request,
  { params }: { params: Params }
) => {
  const { userId }: ILike = await request.json();
  try {
    await connectDB();
    const postId = params.id;
    const existingLike = await Like.findOne({
      poster: userId,
      post: postId,
    });

    if (existingLike) {
      const removeLike = await Like.findByIdAndRemove(postId)
      return new Response("Post deleted!", { status: 200 });
    } else {
      const like = await Like.create({
        poster: userId,
        post: postId,
      });
      await updateLikeCounts(postId);
      return new Response(JSON.stringify(like), { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: Params }
) => { 
try{
  await connectDB()
  const likes = await Like.find({post:params.id}).populate("poster")
  return new Response(JSON.stringify(likes), { status: 200 });
} catch (error) {
  console.log(error);
  return new Response("Something went wrong!", { status: 500 });
}}
