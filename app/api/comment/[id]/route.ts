import connectDB from "../../../../libs/connect";
import Comment from "../../../../models/comment";

interface Params {
  id: string;
}

interface CommentItems {
  comment: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDB();

    const getComments = await Comment.find({ post: params.id }).populate(
      "poster"
    );

    return new Response(JSON.stringify(getComments), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("comments not found!", { status: 404 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  const { comment }: CommentItems = await request.json();
  try {
    await connectDB();

    const updateComments = await Comment.findById(params.id);

    updateComments.comment = comment;

    await updateComments.save();

    return new Response(JSON.stringify(updateComments), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("comments not found!", { status: 404 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    await connectDB();

    const deleteComments = await Comment.findByIdAndRemove(params.id);

    return new Response(JSON.stringify(deleteComments), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("comments not found!", { status: 404 });
  }
};
