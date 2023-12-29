import connectDB from "../../../../libs/connect";
import SavePost from "../../../../models/save";

interface PostData {
  userId: string;
  postId: string;
  owner: string
}

export const POST = async (request: Request) => {
  const { userId, postId,ownerId }: PostData = await request.json();
  try {
    await connectDB();

    const savePost = new SavePost({
      poster: userId,
      post: postId,
      owner: ownerId
    });

    await savePost.save();

    return new Response(JSON.stringify(savePost), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Post not saved sucessfully", { status: 500 });
  }
};
