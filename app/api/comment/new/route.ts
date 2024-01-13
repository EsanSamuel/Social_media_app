import Comment from "../../../../models/comment";
import connectDB from "../../../../libs/connect";
import { z } from "zod";

const validationSchema = z.object({
  userId: z.string().min(5),
  postId: z.string().min(5),
  comment: z.string().min(1).max(50)
});

interface PostItems {
  userId: string;
  postId: string;
  comment: string;
}

export const POST = async (request: Request) => {
  const validate = validationSchema.parse(await request.json());
  const { userId, postId, comment }: PostItems = validate;
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
    return new Response("something went wrong!", { status: 404 });
  }
};
