import Reply from "../../../../models/replies";
import connectDB from "../../../../libs/connect";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDB();

    const getReply = await Reply.findById(params.id)
      .populate("poster")
      .populate("comment");
    return new Response(JSON.stringify(getReply), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("error", { status: 500 });
  }
};
