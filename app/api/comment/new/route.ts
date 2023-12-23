import Comment from "../../../../models/comment";
import connectDB from "../../../../libs/connect";

interface PostItems {
  userId: string;
  postId: string;
  comment: string;
}

export const POST = async (request: Request) => {
  const { userId, postId, comment }: PostItems = await request.json();
  try {
    await connectDB();
    const newComment = new Comment({
      poster: userId,
      post: postId,
      comment,
    });

    await newComment.save();
    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('something went wrong!', { status: 404 });
  }
};
