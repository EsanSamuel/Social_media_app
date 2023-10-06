import connectDB from "../../../../../libs/connect";
import Prompt from "../../../../../models/prompt";

export const GET = async (request, { params }) => {
  try {
    connectDB();

    const prompt = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
