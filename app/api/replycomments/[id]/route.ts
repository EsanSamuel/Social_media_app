import connectDB from "../../../../libs/connect";
import Reply from "../../../../models/replies";

interface Params {
  id: string;
}

interface ReplyItems {
  reply: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDB();

    const getReply = await Reply.find({ comment: params.id }).populate(
      "poster"
    );

    return new Response(JSON.stringify(getReply), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("comments not found!", { status: 404 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  const { reply }: ReplyItems = await request.json();
  try {
    await connectDB();

    const updateReply = await Reply.findById(params.id);

    updateReply.reply = reply;

    await updateReply.save();

    return new Response(JSON.stringify(updateReply), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("reply not found!", { status: 404 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    await connectDB();

    const deleteReply = await Reply.findByIdAndRemove(params.id);

    return new Response(JSON.stringify(deleteReply), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("reply not found!", { status: 404 });
  }
};
