import connectDB from "../../../../libs/connect";
import SavePost from "../../../../models/save";
import { z } from "zod";

const validationSchema = z.object({
  userId: z.string().min(5),
  postId: z.string().min(5),
  ownerId: z.string().min(5),
});

interface PostData {
  userId: string;
  postId: string;
  ownerId: string;
}

export const POST = async (request: Request) => {
  const validate = validationSchema.parse(await request.json())
  const { userId, postId, ownerId }: PostData = validate;
  try {
    await connectDB();

    const savePost = new SavePost({
      poster: userId,
      post: postId,
      owner: ownerId,
    });

    await savePost.save();

    return new Response(JSON.stringify(savePost), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Post not saved sucessfully", { status: 500 });
  }
};
