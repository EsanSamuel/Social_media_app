import SavePost from "../../../../../models/save";
import connectDB from "../../../../../libs/connect";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDB();
    const getSavedPost = await SavePost.find({ poster: params.id })
      .populate("poster")
      .populate("post");

    return new Response(JSON.stringify(getSavedPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 404 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    connectDB();
    const deleteSavedPost = await SavePost.findByIdAndRemove(params.id);
    return new Response(JSON.stringify(deleteSavedPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something wet wrong!", { status: 404 });
  }
};
