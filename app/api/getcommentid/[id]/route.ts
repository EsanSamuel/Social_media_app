import Comment from "../../../../models/comment";
import connectDB from "../../../../libs/connect";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDB();

    const getComment = await Comment.findById(params.id)
      .populate("poster")
      .populate("post");
    return new Response(JSON.stringify(getComment), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response('error', { status: 500 });
  }
};
