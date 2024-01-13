import Reply from "../../../../models/replies";
import connectDB from "../../../../libs/connect";
import { z } from "zod";

interface ReplyData {
  userId: string;
  commentId: string;
  reply: string;
}

const validateReply = z.object({
  userId: z.string().min(5),
  commentId: z.string().min(5),
  reply: z.string().min(1).max(50),
});

export const POST = async (request: Request) => {
  const validate = validateReply.parse(await request.json());
  const { userId, commentId, reply }: ReplyData = validate;
  try {
    await connectDB();

    const newReplies = new Reply({
      poster: userId,
      comment: commentId,
      reply,
    });

    await newReplies.save();
    return new Response(JSON.stringify(newReplies), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong!", { status: 500 });
  }
};
