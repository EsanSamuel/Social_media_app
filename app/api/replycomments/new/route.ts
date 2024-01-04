import Reply from "../../../../models/replies";
import connectDB from "../../../../libs/connect";

interface ReplyData {
  userId: string;
  commentId: string;
  reply: string;
}

export const POST = async (request: Request) => {
  const { userId, commentId, reply }: ReplyData = await request.json();
  try {
    await connectDB();

    const newReplies = new Reply({
      poster: userId,
      comment: commentId,
      reply
    });

    await newReplies.save();
    return new Response(JSON.stringify(newReplies), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong!", { status: 500 });
  }
};
